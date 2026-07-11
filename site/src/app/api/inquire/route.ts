import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  // POC: log inquiry — wire to Resend in production
  console.log("[inquiry]", body.variant, body);

  return NextResponse.json({ ok: true });
}
