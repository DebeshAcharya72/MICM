import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getAlumni();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch alumni" }, { status: 500 });
  }
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ detail: "Alumni name is required" }, { status: 400 });
    }
    const item = await db.createAlumni(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to create alumni record" }, { status: 400 });
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
    const deleted = await db.deleteAlumni(id);
    if (!deleted) {
      return NextResponse.json({ detail: "Alumni not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Alumni deleted successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to delete alumni" }, { status: 400 });
  }
}
