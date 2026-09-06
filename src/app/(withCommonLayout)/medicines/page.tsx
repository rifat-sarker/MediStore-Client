import MedicineCard from "@/components/modules/home/MedicineCard";
import { API_BASE_URL, fetchCategories } from "@/lib/api";
import { Filter, SlidersHorizontal, CheckSquare, Search } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "All Medicines — MediStore",
  description: "Browse our complete catalog of high-quality medicines and health products.",
};

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; minPrice?: string; maxPrice?: string; rx?: string }>;
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
  
  // Inject mock data if DB empty
  if (medicines.length === 0) {
    medicines = [
      { id: "m1", name: "Omega-3 Fish Oil 1000mg", manufacturer: "Nature's Bounty", price: 25.99, stock: 50, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&auto=format&fit=crop" },
      { id: "m2", name: "Paracetamol 500mg (100 pack)", manufacturer: "Tylenol", price: 8.50, stock: 120, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop" },
      { id: "m3", name: "Amoxicillin 250mg", manufacturer: "Pfizer", price: 15.00, stock: 30, requiredPrescription: true, imageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=300&auto=format&fit=crop" },
      { id: "m4", name: "Vitamin C with Zinc", manufacturer: "Centrum", price: 18.99, stock: 200, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1550572017-edb9c46d3e8f?q=80&w=300&auto=format&fit=crop" },
      { id: "m5", name: "Ibuprofen 400mg Liquid Gels", manufacturer: "Advil", price: 12.99, stock: 85, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1583947581924-860bda6a5c83?q=80&w=300&auto=format&fit=crop" },
      { id: "m6", name: "Cetirizine Allergy Relief", manufacturer: "Zyrtec", price: 22.50, stock: 60, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1585698436531-97b76e1045a5?q=80&w=300&auto=format&fit=crop" },
    ];
  }

  let categories = await fetchCategories();
  if (!categories || categories.length === 0) {
    categories = [
      { id: "c1", name: "Vitamins & Supplements" },
      { id: "c2", name: "Pain Relief" },
      { id: "c3", name: "First Aid" },
      { id: "c4", name: "Personal Care" },
      { id: "c5", name: "Cold & Flu" },
      { id: "c6", name: "Digestive Health" },
    ];
  }

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
              Browse <span className="font-semibold text-foreground">{medicines.length}</span> verified healthcare products.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            <select className="bg-card border border-border rounded-xl px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-card border border-border rounded-3xl p-6 sticky top-24 shadow-sm">
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
                  <Link href={`/medicines`} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${!params.category ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50'}`}>
                        {!params.category && <CheckSquare className="w-3.5 h-3.5 text-primary-foreground" />}
                      </div>
                      <span className={`text-sm ${!params.category ? 'font-semibold text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>All Products</span>
                    </div>
                  </Link>
                  {categories.map((cat: any) => (
                    <Link href={`/medicines?category=${cat.name}`} key={cat.id} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${params.category === cat.name ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50'}`}>
                          {params.category === cat.name && <CheckSquare className="w-3.5 h-3.5 text-primary-foreground" />}
                        </div>
                        <span className={`text-sm ${params.category === cat.name ? 'font-semibold text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{cat.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8 border-t border-border/50 pt-6">
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Price Range</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">৳</span>
                    <input type="number" placeholder="Min" className="w-full h-10 pl-7 pr-3 rounded-xl border border-border bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">৳</span>
                    <input type="number" placeholder="Max" className="w-full h-10 pl-7 pr-3 rounded-xl border border-border bg-secondary/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
              </div>

              {/* Prescription Requirements */}
              <div className="border-t border-border/50 pt-6">
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Prescription</h3>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-border text-primary focus:ring-primary accent-primary" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Rx Required Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {params.search && (
              <div className="mb-6 bg-primary/10 border border-primary/20 text-primary-foreground p-4 rounded-2xl flex items-center gap-3">
                <Search className="w-5 h-5 text-primary" />
                <p className="text-primary font-medium">Showing results for: <span className="font-bold">"{params.search}"</span></p>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {medicines.map((medicine: any) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
