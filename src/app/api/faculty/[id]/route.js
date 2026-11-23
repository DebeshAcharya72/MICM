import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request, { params }) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  try {
    const body = await request.json();
    const updated = await db.updateFaculty(id, body);
    if (!updated) {
      return NextResponse.json({ detail: "Faculty member not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Faculty member updated successfully", faculty: updated });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to update faculty member" }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const deleted = await db.deleteFaculty(id);
  if (!deleted) {
    return NextResponse.json({ detail: "Faculty member not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Faculty member removed" });
}
