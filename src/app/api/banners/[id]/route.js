import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

export async function PUT(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!db.verifyToken(authHeader)) {
      return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const updated = await db.updateBanner(id, body);

    if (!updated) {
      return NextResponse.json({ detail: 'Banner not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json({ detail: 'Failed to update banner: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!db.verifyToken(authHeader)) {
      return NextResponse.json({ detail: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const success = await db.deleteBanner(id);

    if (!success) {
      return NextResponse.json({ detail: 'Banner not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json({ detail: 'Failed to delete banner: ' + error.message }, { status: 500 });
  }
}
