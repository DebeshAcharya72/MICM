import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET: Fetch all alumni requests (Admin Auth required)
export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const list = await db.getAlumniRequests();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch alumni requests" }, { status: 500 });
  }
}

// POST: Public alumni registration submission (No auth required)
export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.full_name) {
      return NextResponse.json({ detail: "Full name is required" }, { status: 400 });
    }
    const item = await db.createAlumniRequest(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to submit alumni registration request" }, { status: 400 });
  }
}

// DELETE: Remove or reject request (Admin Auth required)
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
    const deleted = await db.deleteAlumniRequest(id);
    if (!deleted) {
      return NextResponse.json({ detail: "Alumni request not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Alumni request removed successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to delete alumni request" }, { status: 400 });
  }
}
