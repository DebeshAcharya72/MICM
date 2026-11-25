import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getCampusEvents();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch campus events" }, { status: 500 });
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
      return NextResponse.json({ detail: "Event title is required" }, { status: 400 });
    }
    const item = await db.createCampusEvent(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to create campus event" }, { status: 400 });
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
    const deleted = await db.deleteCampusEvent(id);
    if (!deleted) {
      return NextResponse.json({ detail: "Campus event not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Campus event deleted successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to delete campus event" }, { status: 400 });
  }
}
