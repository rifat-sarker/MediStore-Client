export const getApiBaseUrl = () => {
  const publicApi = process.env.NEXT_PUBLIC_BASE_API;
  if (publicApi && !publicApi.includes("localhost") && !publicApi.includes("127.0.0.1")) {
    return publicApi;
  }
  if (typeof window === "undefined" && process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL;
  }
  return publicApi || "http://localhost:5001/api/v1";
};

export const API_BASE_URL = getApiBaseUrl();


export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchMedicines() {
  try {
    const response = await fetch(`${API_BASE_URL}/medicines`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error('Failed to fetch medicines');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
