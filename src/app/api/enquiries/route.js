import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const enquiries = await db.getEnquiries();
  return NextResponse.json(enquiries);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const enq = await db.createEnquiry(body);

    return NextResponse.json({
      id: enq.id,
      message: `Thank you ${enq.full_name}. Your enquiry for ${enq.programme} has been received. Our admission desk will connect with you shortly.`,
      email_alert_status: "Simulated dispatch sent to applicant & admissions desk"
    });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to submit enquiry" }, { status: 400 });
  }
}