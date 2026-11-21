import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request, { params }) {
  const { trackingId } = params;
  const grv = db.trackGrievance(trackingId);

  if (!grv) {
    return NextResponse.json({ detail: "Grievance Tracking ID not found" }, { status: 404 });
  }

  return NextResponse.json(grv);
}