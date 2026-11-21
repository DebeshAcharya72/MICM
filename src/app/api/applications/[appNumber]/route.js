import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request, { params }) {
  const { appNumber } = params;
  const app = db.getApplicationByNumber(appNumber);

  if (!app) {
    return NextResponse.json({ detail: "Application Number not found" }, { status: 404 });
  }

  return NextResponse.json(app);
}