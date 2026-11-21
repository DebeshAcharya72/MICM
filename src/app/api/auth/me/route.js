import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Missing or invalid authentication token" }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    role: "admin",
    institution: "Madhusudan Institute of Co-operative Management, Bhubaneswar"
  });
}