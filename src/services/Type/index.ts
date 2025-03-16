"use server";
//get all types from db
export const getAllTypes = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/types?limit=${limit}&page=${page}`,
      {
        next: {
          tags: ["TYPE"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
