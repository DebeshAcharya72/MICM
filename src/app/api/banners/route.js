import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active_only') !== 'false';
    const banners = await db.getBanners(activeOnly);
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json({ detail: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!db.verifyToken(authHeader)) {
      return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ detail: 'Banner title is required' }, { status: 400 });
    }

    const created = await db.createBanner(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json({ detail: 'Failed to create banner: ' + error.message }, { status: 500 });
  }
}
