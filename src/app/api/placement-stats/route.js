import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getPlacementStats();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch placement stats" }, { status: 500 });
  }
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.label || !body.value) {
      return NextResponse.json({ detail: "Label and value are required" }, { status: 400 });
    }
    const item = await db.createPlacementStat(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to create placement stat" }, { status: 400 });
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
    const deleted = await db.deletePlacementStat(id);
    if (!deleted) {
      return NextResponse.json({ detail: "Placement stat not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Placement stat deleted successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to delete placement stat" }, { status: 400 });
  }
}
