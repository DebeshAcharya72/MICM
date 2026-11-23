import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active_only') !== 'false';
  const notices = await db.getNotices(activeOnly);
  return NextResponse.json(notices);
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const notice = await db.createNotice(body);
    return NextResponse.json({ id: notice.id, message: "Notice published successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to create notice" }, { status: 400 });
  }
}