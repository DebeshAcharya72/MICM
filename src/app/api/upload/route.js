import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const IMGBB_API_KEY = "82a87af617d1c707521a576a9b9cab72";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ detail: "No image file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // 1. Try uploading to ImgBB with the user's API key
    try {
      const imgbbForm = new URLSearchParams();
      imgbbForm.append('key', IMGBB_API_KEY);
      imgbbForm.append('image', base64Image);

      const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: imgbbForm
      });

      const imgbbData = await imgbbRes.json();

      if (imgbbData && imgbbData.success && imgbbData.data && imgbbData.data.url) {
        return NextResponse.json({
          success: true,
          url: imgbbData.data.url,
          display_url: imgbbData.data.display_url || imgbbData.data.url,
          source: 'imgbb'
        });
      }
    } catch (err) {
      console.warn("ImgBB upload attempt failed, falling back to local storage:", err.message);
    }

    // 2. Reliable Fallback: Save to public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const safeName = (file.name || 'uploaded_image.png').replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${Date.now()}_${safeName}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const localUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: localUrl,
      source: 'local_storage',
      note: 'Saved locally as resilient fallback'
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ detail: "Failed to upload image: " + error.message }, { status: 500 });
  }
}