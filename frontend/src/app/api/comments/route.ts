import { NextResponse } from 'next/server';
import { comments } from '../../../../data/comments';

export async function GET() {
  return NextResponse.json(comments);
}
