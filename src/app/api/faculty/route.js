import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const faculty = await db.getFaculty();
    return NextResponse.json(faculty);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch faculty" }, { status: 500 });
  }
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const member = await db.createFaculty(body);
    return NextResponse.json({ id: member.id, message: "Faculty member added successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to add faculty member" }, { status: 400 });
  }
}
