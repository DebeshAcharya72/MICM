import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(request, { params }) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const deleted = db.deleteAnnouncement(id);
  if (!deleted) {
    return NextResponse.json({ detail: "Announcement not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Announcement removed" });
}
