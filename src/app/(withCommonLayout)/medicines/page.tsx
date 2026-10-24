import MedicineCard from "@/components/modules/home/MedicineCard";
import { API_BASE_URL, fetchCategories } from "@/lib/api";
import { MEDEX_BANGLADESH_PRODUCTS } from "@/types/product";
import { Filter, Search } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "All Medicines — MediStore",
  description: "Browse our complete catalog of high-quality medicines and health products.",
};

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; minPrice?: string; maxPrice?: string; rx?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const itemsPerPage = 16;

  const qs = new URLSearchParams();
  if (params.category) qs.set("categories", params.category);
  if (params.search) qs.set("searchTerm", params.search);
  qs.set("page", String(currentPage));
  qs.set("limit", String(itemsPerPage));

  let medicines: any[] = [];
  let totalCount = 0;

  try {
    const res = await fetch(`${API_BASE_URL}/medicines?${qs.toString()}`, {
      next: { revalidate: 30 },
    });
    const data = await res.json();
    medicines = data.data || [];
    totalCount = data.meta?.total || medicines.length;
  } catch {
    medicines = [];
    totalCount = 0;
  }
  
  // If API returned empty or during fallback, use full MEDEX dataset
  if (medicines.length === 0) {
    medicines = MEDEX_BANGLADESH_PRODUCTS;
    totalCount = medicines.length;
  }

  // Active Filtering Logic
  if (params.category) {
    const catQuery = params.category.toLowerCase().trim();
    const filtered = medicines.filter(m => {
      const itemCatName = (m.category?.name || m.categoryName || "").toLowerCase();
      const itemName = (m.name || "").toLowerCase();
      const itemDesc = (m.description || "").toLowerCase();
      return (
        itemCatName.includes(catQuery) ||
        catQuery.includes(itemCatName) ||
        itemName.includes(catQuery) ||
        itemDesc.includes(catQuery)
      );
    });
    if (filtered.length > 0) {
      medicines = filtered;
      totalCount = filtered.length;
    }
  }

  if (params.search) {
    const sQuery = params.search.toLowerCase().trim();
    const queryTokens = sQuery.split(/[\s,&+]+/).filter((t: string) => t.length > 2);
    
    let matched = medicines.filter(m => {
      const fullText = `${m.name} ${m.genericName || ""} ${m.manufacturer || ""} ${m.description || ""} ${m.category?.name || ""}`.toLowerCase();
      return fullText.includes(sQuery) || (queryTokens.length > 0 && queryTokens.some((t: string) => fullText.includes(t)));
    });

    if (matched.length === 0) {
      matched = MEDEX_BANGLADESH_PRODUCTS.filter(m => {
        const fullText = `${m.name} ${m.genericName || ""} ${m.manufacturer || ""} ${m.description || ""} ${m.category?.name || ""}`.toLowerCase();
        return fullText.includes(sQuery) || (queryTokens.length > 0 && queryTokens.some((t: string) => fullText.includes(t)));
      });
    }

    medicines = matched;
    totalCount = matched.length;
  }
  
  if (params.minPrice) {
    medicines = medicines.filter(m => m.price >= Number(params.minPrice));
    totalCount = medicines.length;
  }
  if (params.maxPrice) {
    medicines = medicines.filter(m => m.price <= Number(params.maxPrice));
    totalCount = medicines.length;
  }
  if (params.rx === "on") {
    medicines = medicines.filter(m => m.requiredPrescription === true);
    totalCount = medicines.length;
  }

  // Calculate clean pagination slices
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;
  const paginatedMedicines = medicines.length > itemsPerPage 
    ? medicines.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : medicines;

  let categories = await fetchCategories();
  if (!categories || categories.length === 0) {
    categories = [
      { id: "c1", name: "Medicines" },
      { id: "c2", name: "Baby & Mom" },
      { id: "c3", name: "Diabetic Care" },
      { id: "c4", name: "Health & Devices" },
      { id: "c5", name: "Personal Care" },
      { id: "c6", name: "Vital Wellness" },
    ];
  }

  // Helper to build pagination links
  const createPageUrl = (pageNumber: number) => {
    const p = new URLSearchParams();
    if (params.category) p.set("category", params.category);
    if (params.search) p.set("search", params.search);
    if (params.minPrice) p.set("minPrice", params.minPrice);
    if (params.maxPrice) p.set("maxPrice", params.maxPrice);
    if (params.rx) p.set("rx", params.rx);
    p.set("page", String(pageNumber));
    return `/medicines?${p.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background/50 pt-8 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-foreground tracking-tight">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">Catalog</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse <span className="font-semibold text-foreground">{totalCount}</span> verified healthcare products (Page {currentPage} of {totalPages}).
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <form method="GET" action="/medicines" className="bg-card border border-border rounded-none p-7 sticky top-24 shadow-xl shadow-primary/5">
              
              {/* Keep search query if it exists */}
              {params.search && <input type="hidden" name="search" value={params.search} />}

              <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg">Filters</h2>
                {Object.keys(params).length > 0 && (
                  <Link href="/medicines" className="ml-auto text-xs font-semibold text-destructive hover:underline">Clear All</Link>
                )}
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Categories</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="category" value="" defaultChecked={!params.category} className="w-5 h-5 text-primary focus:ring-primary accent-primary" />
                    <span className={`text-sm ${!params.category ? 'font-semibold text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>All Products</span>
                  </label>
                  {categories.map((cat: any) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="category" value={cat.name} defaultChecked={params.category === cat.name} className="w-5 h-5 text-primary focus:ring-primary accent-primary" />
                      <span className={`text-sm ${params.category === cat.name ? 'font-semibold text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8 border-t border-border/50 pt-6">
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Price Range</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">৳</span>
                    <input type="number" name="minPrice" defaultValue={params.minPrice} placeholder="Min" className="w-full h-10 pl-7 pr-3 rounded-xl border border-border bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">৳</span>
                    <input type="number" name="maxPrice" defaultValue={params.maxPrice} placeholder="Max" className="w-full h-10 pl-7 pr-3 rounded-xl border border-border bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
              </div>

              {/* Prescription Requirements */}
              <div className="border-t border-border/50 pt-6 mb-8">
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Prescription</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" name="rx" defaultChecked={params.rx === "on"} className="w-5 h-5 rounded border-border text-primary focus:ring-primary accent-primary" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Rx Required Only</span>
                </label>
              </div>

              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Apply Filters
              </button>
            </form>
          </aside>

          {/* Product Grid & Pagination */}
          <div className="flex-1">
            {params.search && (
              <div className="mb-6 bg-primary/10 border border-primary/20 text-primary-foreground p-4 rounded-2xl flex items-center gap-3">
                <Search className="w-5 h-5 text-primary" />
                <p className="text-primary font-medium">Showing results for: <span className="font-bold">"{params.search}"</span> ({totalCount} matches)</p>
              </div>
            )}
            
            {paginatedMedicines.length === 0 ? (
               <div className="bg-card p-12 rounded-3xl text-center border border-border">
                 <h2 className="text-2xl font-bold mb-2">No products found</h2>
                 <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
               </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4.5">
                  {paginatedMedicines.map((medicine: any) => (
                    <MedicineCard key={medicine.id} medicine={medicine} />
                  ))}
                </div>

                {/* Smooth Pagination Bar */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    {currentPage > 1 ? (
                      <Link
                        href={createPageUrl(currentPage - 1)}
                        className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary font-semibold text-sm transition-all"
                      >
                        &larr; Prev
                      </Link>
                    ) : (
                      <span className="px-4 py-2 rounded-xl border border-border bg-muted/40 text-muted-foreground text-sm font-semibold cursor-not-allowed">
                        &larr; Prev
                      </span>
                    )}

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 7 && currentPage > 4) {
                          pageNum = currentPage - 3 + i;
                          if (pageNum > totalPages) return null;
                        }
                        return (
                          <Link
                            key={pageNum}
                            href={createPageUrl(pageNum)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                              currentPage === pageNum
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                                : "bg-card border border-border text-foreground hover:bg-secondary"
                            }`}
                          >
                            {pageNum}
                          </Link>
                        );
                      })}
                    </div>

                    {currentPage < totalPages ? (
                      <Link
                        href={createPageUrl(currentPage + 1)}
                        className="px-4 py-2 rounded-xl border border-border bg-card hover:bg-secondary font-semibold text-sm transition-all"
                      >
                        Next &rarr;
                      </Link>
                    ) : (
                      <span className="px-4 py-2 rounded-xl border border-border bg-muted/40 text-muted-foreground text-sm font-semibold cursor-not-allowed">
                        Next &rarr;
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
