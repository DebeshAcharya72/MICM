import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(request, { params }) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
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
