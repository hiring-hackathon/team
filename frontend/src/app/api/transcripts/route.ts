import { NextResponse } from 'next/server';
import { transcripts } from '../../../../data/transcripts';

export async function GET() {
  return NextResponse.json(transcripts);
}
