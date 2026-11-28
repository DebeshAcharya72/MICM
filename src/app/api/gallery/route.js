import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getGallery();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ detail: "Title is required" }, { status: 400 });
    }
    if (!body.url) {
      return NextResponse.json({ detail: "Image or Video URL is required" }, { status: 400 });
    }
    const item = await db.createGalleryItem(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to create gallery item" }, { status: 400 });
  }
}

export async function DELETE(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ detail: "ID is required" }, { status: 400 });
  }

  try {
    const deleted = await db.deleteGalleryItem(id);
    if (!deleted) {
      return NextResponse.json({ detail: "Gallery item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to delete gallery item" }, { status: 400 });
  }
}
