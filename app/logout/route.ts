import { NextResponse } from "next/server";
import { signOut } from "../auth/auth";

export async function GET() {
  await signOut();
  return NextResponse.json({ message: "You've been signed out." });
}
