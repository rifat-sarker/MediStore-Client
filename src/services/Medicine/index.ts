"use server";

import { SearchParams } from "@/types/common";

const getApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_BASE_API || "http://server:5001/api/v1";
  }
  return process.env.NEXT_PUBLIC_BASE_API || "http://localhost:5001/api/v1";
};


// get all product from db
export const getAllProduct = async (searchParams: SearchParams = {}) => {
  const { minPrice, maxPrice, categories, page, limit } = searchParams;

  try {
    const query = new URLSearchParams();

    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (categories) query.append("categories", categories);
    if (page) query.append("page", page);
    if (limit) query.append("limit", limit);
    if (searchParams.searchTerm) query.append("searchTerm", searchParams.searchTerm);

    const res = await fetch(
      `${getApiBaseUrl()}/medicines?${query.toString()}`,
      {
        next: { tags: ["Medicine"] },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};




// get sinle product
export const getSingleProduct = async (medicineId: string) => {
  try {
    const res = await fetch(
      `${getApiBaseUrl()}/medicines/${medicineId}`,
      {
        next: {
          tags: ["Medicine"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
