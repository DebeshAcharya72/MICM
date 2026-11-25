import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(request, { params }) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
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
