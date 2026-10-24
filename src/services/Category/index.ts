"use server";

const getApiBaseUrl = () => {
  const publicApi = process.env.NEXT_PUBLIC_BASE_API;
  if (publicApi && !publicApi.includes("localhost") && !publicApi.includes("127.0.0.1")) {
    return publicApi;
  }
  if (typeof window === "undefined" && process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL;
  }
  return publicApi || "http://localhost:5001/api/v1";
};

//get all categories from db
export const getAllCategories = async (page?: string, limit?: string) => {
  try {
    const query = new URLSearchParams();
    if (page) query.append("page", page);
    if (limit) query.append("limit", limit);

    const queryString = query.toString() ? `?${query.toString()}` : "";

    const res = await fetch(
      `${getApiBaseUrl()}/categories${queryString}`,
      {
        next: {
          tags: ["CATEGORY"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
