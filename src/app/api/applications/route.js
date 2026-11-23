import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const applications = await db.getApplications();
  return NextResponse.json(applications);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const app = await db.createApplication(body);

    return NextResponse.json({
      success: true,
      application_id: app.id,
      application_number: app.app_number,
      programme: app.programme,
      applicant_name: app.full_name,
      submission_time: app.created_at,
      message: `Application successfully registered! Your Application Number is ${app.app_number}. A confirmation email alert has been generated.`
    });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to submit application" }, { status: 400 });
  }
}