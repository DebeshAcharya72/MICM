import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const member = await db.getFacultyMember(id);
    if (!member) {
      return NextResponse.json({ detail: "Faculty member not found" }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch faculty member" }, { status: 500 });
  }
}

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
  try {
    const deleted = await db.deleteFaculty(id);
    if (!deleted) {
      return NextResponse.json({ detail: "Faculty member not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Faculty member removed" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to delete faculty member" }, { status: 500 });
  }
}
