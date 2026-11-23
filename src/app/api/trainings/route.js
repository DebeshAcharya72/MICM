import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const list = await db.getTrainings();
    return NextResponse.json(list);
  } catch (err) {
    return NextResponse.json({ detail: "Failed to fetch trainings" }, { status: 500 });
  }
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!db.verifyToken(authHeader)) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const item = await db.createTraining(body);
    return NextResponse.json({ id: item.id, message: "Training programme created successfully" });
  } catch (err) {
    return NextResponse.json({ detail: "Failed to create training programme" }, { status: 400 });
  }
}
