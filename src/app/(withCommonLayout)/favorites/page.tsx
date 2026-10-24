"use client";

import { useEffect, useState } from "react";
import MedicineCard from "@/components/modules/home/MedicineCard";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { IProduct, MEDEX_BANGLADESH_PRODUCTS } from "@/types/product";
import { API_BASE_URL } from "@/lib/api";

const MOCK_DATA: IProduct[] = MEDEX_BANGLADESH_PRODUCTS;

export default function FavoritesPage() {
  const [favoriteItems, setFavoriteItems] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavIds = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (storedFavIds.length === 0) {
          setIsLoading(false);
          return;
        }

        let allMedicines: IProduct[] = [];
        try {
          const res = await fetch(`${API_BASE_URL}/medicines?limit=100`);
          const data = await res.json();
          if (data?.data && Array.isArray(data.data)) {
            allMedicines = data.data;
          }
        } catch {}

        const combined = [...allMedicines];
        MOCK_DATA.forEach(mp => {
          if (!combined.some(c => c.id === mp.id || c.name === mp.name)) {
            combined.push(mp);
          }
        });

        const items = combined.filter((m: IProduct) => 
          storedFavIds.includes(m.id) || storedFavIds.some((favId: string) => favId === m.name || m.id.includes(favId) || favId.includes(m.id))
        );
        setFavoriteItems(items);
      } catch (error) {
        const storedFavIds = JSON.parse(localStorage.getItem("favorites") || "[]");
        const items = MOCK_DATA.filter((m) => storedFavIds.includes(m.id));
        setFavoriteItems(items);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="mt-4 text-muted-foreground font-medium animate-pulse">Loading your favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-red-100 p-3 rounded-2xl">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Your Favorites</h1>
            <p className="text-muted-foreground mt-1">
              You have {favoriteItems.length} saved {favoriteItems.length === 1 ? 'item' : 'items'}.
            </p>
          </div>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border shadow-sm">
            <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No favorites yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Looks like you haven't saved any medicines to your favorites. Browse our catalog and click the heart icon to save items for later.
            </p>
            <Link 
              href="/medicines" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              <Search className="w-5 h-5" />
              Browse Medicines
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteItems.map((item) => (
              <MedicineCard key={item.id} medicine={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
