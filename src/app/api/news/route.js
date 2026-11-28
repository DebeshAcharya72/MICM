import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const news = await db.getNews();
    return NextResponse.json(news);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch news" }, { status: 500 });
  }
}
