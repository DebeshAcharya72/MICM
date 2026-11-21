import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "Madhusudan Institute of Co-operative Management (MICM) Next.js Full-Stack API",
    timestamp: new Date().toISOString(),
    engine: "Next.js 14 App Router + Persistent JSON Store"
  });
}