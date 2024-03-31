import { NextResponse } from 'next/server';
import { signOut } from '../auth';

export async function GET() {
  await signOut();
  return new NextResponse("You've been signed out.");
}
