import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const news = db.getNews();
  return NextResponse.json(news);
}