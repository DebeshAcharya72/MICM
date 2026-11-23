import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const stats = await db.getDashboardStats();
  return NextResponse.json(stats);
}