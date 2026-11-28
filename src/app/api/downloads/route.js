import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const downloads = await db.getDownloads();
    return NextResponse.json(downloads);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch downloads" }, { status: 500 });
  }
}
