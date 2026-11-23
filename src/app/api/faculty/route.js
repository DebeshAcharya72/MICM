import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const faculty = await db.getFaculty();
  return NextResponse.json(faculty);
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