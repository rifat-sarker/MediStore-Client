"use client";

import { X, Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/product";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_FAVS: any[] = [
  { id: "m1", name: "Omega-3 Fish Oil 1000mg", manufacturer: "Nature's Bounty", price: 25.99, imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&auto=format&fit=crop", stock: 50 },
  { id: "m2", name: "Paracetamol 500mg (100 pack)", manufacturer: "Square Pharma", price: 8.50, imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop", stock: 120 },
];

export default function FavoritesDrawer({ isOpen, onClose }: FavoritesDrawerProps) {
  const [favoriteItems, setFavoriteItems] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const storedFavIds: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (storedFavIds.length === 0) {
        setFavoriteItems([]);
        return;
      }
      
      const res = await fetch(`${API_BASE_URL}/medicines`);
      const data = await res.json();
      const allMedicines: IProduct[] = data?.data && data.data.length > 0 ? data.data : FALLBACK_FAVS;
      const matched = allMedicines.filter((m) => storedFavIds.includes(m.id));
      setFavoriteItems(matched);
    } catch {
      const storedFavIds: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
      const matched = FALLBACK_FAVS.filter((m) => storedFavIds.includes(m.id));
      setFavoriteItems(matched);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadFavorites();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const removeFavorite = (id: string) => {
    const storedFavIds: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = storedFavIds.filter((favId) => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavoriteItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from favorites");
  };

  const handleAddToCart = (item: IProduct) => {
    dispatch(addProduct(item));
    toast.success(`${item.name} added to cart!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-card border-l border-border h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-secondary/30">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 rounded-xl text-red-600">
              <Heart className="w-5 h-5 fill-red-500" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-foreground">Saved Items</h2>
              <p className="text-xs text-muted-foreground">{favoriteItems.length} items in your wishlist</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : favoriteItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
              <div className="w-20 h-20 rounded-full bg-secondary/60 flex items-center justify-center mb-4">
                <Heart className="w-10 h-10 stroke-1 text-muted-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">No favorites yet</h3>
              <p className="text-xs max-w-xs mb-6">Click the heart button on any medicine to save it for easy access later.</p>
              <Link 
                href="/medicines" 
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-transform active:scale-95"
              >
                Explore Medicines
              </Link>
            </div>
          ) : (
            favoriteItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-3 p-3.5 bg-background border border-border/70 rounded-2xl shadow-sm hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-xl bg-secondary/30 overflow-hidden shrink-0 flex items-center justify-center p-1">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop"} 
                    alt={item.name} 
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate text-foreground leading-snug">{item.name}</h4>
                  <p className="text-[11px] text-muted-foreground truncate">{item.manufacturer}</p>
                  <p className="text-sm font-black text-primary mt-1">৳ {item.price}</p>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button 
                    onClick={() => removeFavorite(item.id)}
                    className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-1 bg-primary text-primary-foreground px-2.5 py-1.5 rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3 h-3" /> Add
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoriteItems.length > 0 && (
          <div className="p-5 border-t border-border bg-secondary/20">
            <Link 
              href="/favorites"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl border border-border text-center text-xs font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              View Full Wishlist Page <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
