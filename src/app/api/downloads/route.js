import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const downloads = db.getDownloads();
  return NextResponse.json(downloads);
}