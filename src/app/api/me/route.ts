import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const parts = accessToken.split(".");
    if (parts.length !== 3) return NextResponse.json({ user: null });

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf-8")
    );

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user: payload });
  } catch {
    return NextResponse.json({ user: null });
  }
}
