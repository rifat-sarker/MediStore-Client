"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const getApiBaseUrl = () => {
  // If NEXT_PUBLIC_BASE_API is a remote URL (e.g. Render, Railway, VPS), always use it
  const publicApi = process.env.NEXT_PUBLIC_BASE_API;
  if (publicApi && !publicApi.includes("localhost") && !publicApi.includes("127.0.0.1")) {
    return publicApi;
  }

  // Inside Docker local network
  if (typeof window === "undefined" && process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL;
  }

  return publicApi || "http://localhost:5001/api/v1";
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

export const verifyOtpUser = async (data: { email: string; otp: string }) => {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result?.success && result?.data?.accessToken) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message || "OTP verification failed." };
  }
};

export const resendOtpUser = async (email: string) => {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to resend OTP." };
  }
};

export const forgotPasswordUser = async (email: string) => {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to send reset OTP." };
  }
};

export const resetPasswordUser = async (data: { email: string; otp: string; newPassword: string }) => {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error?.message || "Password reset failed." };
  }
};

export const googleAuthUser = async (data: { name: string; email: string }) => {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result?.success && result?.data?.accessToken) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }
    return result;
  } catch (error: any) {
    return { success: false, message: error?.message || "Google Sign-in failed." };
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

