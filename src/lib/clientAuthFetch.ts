export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5001/api/v1";

export function getClientToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )accessToken=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export async function clientAuthFetch(url: string, options: RequestInit = {}) {
  const token = getClientToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    credentials: "include",
    headers,
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { success: res.ok, status: res.status, raw: text };
  }
}
