import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = db.getAnnouncements();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch announcements" }, { status: 500 });
  }
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const item = db.createAnnouncement(body);
    return NextResponse.json({ id: item.id, message: "Announcement published successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to publish announcement" }, { status: 400 });
  }
}
