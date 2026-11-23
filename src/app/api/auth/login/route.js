import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const result = await db.authenticateAdmin(username, password);

    if (!result) {
      return NextResponse.json(
        { detail: "Invalid administrator credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ detail: "Server error during authentication" }, { status: 500 });
  }
}