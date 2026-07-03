"use server";

import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    // Decode JWT payload (we don't verify here, just decode — verification is on the server)
    const parts = accessToken.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf-8")
    );
    // Check expiry
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
};
