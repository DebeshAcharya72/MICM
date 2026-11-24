import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(request, { params }) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  try {
    const deleted = await db.deleteInternship(id);
    if (!deleted) {
      return NextResponse.json({ detail: "Internship not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Internship deleted successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to delete internship" }, { status: 400 });
  }
}
