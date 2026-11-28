import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const IMGBB_API_KEY = process.env.IMGBB_API_KEY || "82a87af617d1c707521a576a9b9cab72";

export async function POST(request) {
  console.log("--> [POST /api/upload] Incoming file upload request received");
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    console.log("--> [POST /api/upload] Extracted 'image' field:", file ? {
      name: file.name,
      size: file.size,
      type: file.type
    } : null);

    if (!file || typeof file === 'string') {
      console.error("--> [POST /api/upload] Error: No valid File object provided under 'image' key");
      return NextResponse.json({ detail: "No valid image file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // 1. Attempt upload to ImgBB
    try {
      console.log(`--> [POST /api/upload] Uploading to ImgBB (key: ${IMGBB_API_KEY ? 'Present' : 'Missing'})...`);
      
      const imgbbForm = new FormData();
      imgbbForm.append('image', base64Image);

      const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: imgbbForm
      });

      const imgbbData = await imgbbRes.json();
      console.log("--> [POST /api/upload] ImgBB Response Status:", imgbbRes.status, "Success:", imgbbData?.success);

      if (imgbbData && imgbbData.success && imgbbData.data && imgbbData.data.url) {
        console.log("--> [POST /api/upload] ImgBB Upload Success! Direct URL:", imgbbData.data.url);
        return NextResponse.json({
          success: true,
          url: imgbbData.data.url,
          display_url: imgbbData.data.display_url || imgbbData.data.url,
          source: 'imgbb'
        });
      } else {
        console.warn("--> [POST /api/upload] ImgBB returned error or rejected:", imgbbData?.error?.message || imgbbData);
      }
    } catch (err) {
      console.warn("--> [POST /api/upload] ImgBB network request failed:", err.message);
    }

    // 2. Fallback: Save to local public/uploads directory (works for local development)
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const safeName = (file.name || 'uploaded_image.png').replace(/[^a-zA-Z0-9._-]/g, '_');
      const filename = `${Date.now()}_${safeName}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, buffer);
      console.log("--> [POST /api/upload] Local fallback write succeeded:", filePath);

      const localUrl = `/uploads/${filename}`;
      return NextResponse.json({
        success: true,
        url: localUrl,
        source: 'local_storage',
        note: 'Saved locally as resilient fallback'
      });
    } catch (fsErr) {
      console.warn("--> [POST /api/upload] Local filesystem write failed (serverless environment):", fsErr.message);
      
      // 3. Ultra-resilient Fallback: Return Base64 Data URL (ensures image is never lost on serverless platforms)
      const mime = file.type || 'image/jpeg';
      const dataUri = `data:${mime};base64,${base64Image}`;
      console.log("--> [POST /api/upload] Returning Base64 Data URI fallback");
      return NextResponse.json({
        success: true,
        url: dataUri,
        source: 'data_uri',
        note: 'Saved as inline data URI'
      });
    }
  } catch (error) {
    console.error("--> [POST /api/upload] Unhandled Upload Error:", error);
    return NextResponse.json({ detail: "Failed to upload image: " + error.message }, { status: 500 });
  }
}
