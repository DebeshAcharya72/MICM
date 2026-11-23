import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(request, { params }) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'Contacted';

  const updated = await db.updateEnquiryStatus(id, status);
  if (!updated) {
    return NextResponse.json({ detail: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Enquiry status updated" });
}