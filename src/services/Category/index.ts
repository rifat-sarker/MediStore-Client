"use server";

//get all categories
export const getAllCategories = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/categories?limit=${limit}&page=${page}`,
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
