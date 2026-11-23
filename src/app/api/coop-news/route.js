import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getCoopNews();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch cooperative news" }, { status: 500 });
  }
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const item = await db.createCoopNews(body);
    return NextResponse.json({ id: item.id, message: "News published successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to publish news" }, { status: 400 });
  }
}
