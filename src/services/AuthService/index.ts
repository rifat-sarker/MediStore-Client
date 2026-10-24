"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const getApiBaseUrl = () => {
  // If running inside server/docker, connect to server service or localhost
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_BASE_API || "http://server:5001/api/v1";
  }
  return process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5001/api/v1";
};

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Registration failed. Server unreachable.",
    };
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    if (result?.success && result?.data?.accessToken) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Login failed. Please check network connection.",
    };
  }
};

export const logoutUser = async () => {
  try {
    (await cookies()).delete("accessToken");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error?.message };
  }
};

