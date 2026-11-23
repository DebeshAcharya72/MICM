import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const downloads = await db.getDownloads();
  return NextResponse.json(downloads);
}