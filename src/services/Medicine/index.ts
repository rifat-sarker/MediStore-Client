"use server";

// get all products
export const getAllProduct = async (page?: number, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/medicines?limit=${limit}&page=${page}`,
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


// export const getSingleProduct = async (medicineId: string | undefined) => {
//   if (!medicineId) {
//     console.error("❌ Invalid Medicine ID:", medicineId);
//     return null; // Prevents making an invalid request
//   }

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/medicines/${medicineId}`
//     );
//     if (!res.ok) throw new Error("Failed to fetch medicine");

//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching medicine:", error);
//     return null;
//   }
// };
