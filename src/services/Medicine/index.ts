"use server";

import { SearchParams } from "@/types/common";

// get all products
// export const getAllProduct = async (page?: number, limit?: string) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/medicines?limit=${limit}&page=${page}`,
//       {
//         next: {
//           tags: ["Medicine"],
//         },
//       }
//     );
//     const data = await res.json();
//     return data;
//   } catch (error: any) {
//     return Error(error.message);
//   }
// };


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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicines?${query.toString()}`,
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
      `${process.env.NEXT_PUBLIC_BASE_API}/medicines/${medicineId}`,
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
