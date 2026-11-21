import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const grievances = db.getGrievances();
  return NextResponse.json(grievances);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const grv = db.createGrievance(body);

    return NextResponse.json({
      success: true,
      tracking_id: grv.tracking_id,
      message: `Your grievance has been submitted under tracking ID ${grv.tracking_id}. It has been forwarded to the Designated Grievance Officer.`
    });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to submit grievance" }, { status: 400 });
  }
}