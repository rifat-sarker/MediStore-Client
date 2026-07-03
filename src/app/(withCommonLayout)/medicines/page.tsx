import MedicineCard from "@/components/modules/home/MedicineCard";
import { API_BASE_URL } from "@/lib/api";

export const metadata = {
  title: "All Medicines — MediStore",
  description: "Browse our complete catalog of high-quality medicines and health products.",
};

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  if (params.category) qs.set("categories", params.category);
  if (params.search) qs.set("searchTerm", params.search);
  qs.set("limit", "100");

  let medicines: any[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/medicines?${qs.toString()}`, {
      next: { revalidate: 30 },
    });
    const data = await res.json();
    medicines = data.data || [];
  } catch {
    medicines = [];
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-foreground">
            All <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">Medicines</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse our complete catalog of{" "}
            <span className="font-semibold text-foreground">{medicines.length}</span> verified healthcare products.
          </p>
        </div>

        {medicines.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-2xl font-bold mb-2">No medicines found</p>
            <p className="text-sm">Make sure the backend server is running at <code className="bg-secondary px-2 py-1 rounded">localhost:5001</code></p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {medicines.map((medicine: any) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
