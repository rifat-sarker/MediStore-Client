"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";
import { toast } from "sonner";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop";

export default function MedicineCard({ medicine }: { medicine: IProduct }) {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgSrc, setImgSrc] = useState(medicine.imageUrl || DEFAULT_IMAGE);

  // Initialize favorite state from local storage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.includes(medicine.id)) {
      setIsFavorite(true);
    }
  }, [medicine.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const newFavs = favorites.filter((id: string) => id !== medicine.id);
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      setIsFavorite(false);
      toast("Removed from favorites");
    } else {
      favorites.push(medicine.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success("Added to favorites");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the link when clicking the button
    e.stopPropagation();
    dispatch(addProduct(medicine));
    toast.success("Added to Cart!");
  };

  return (
    <Link href={`/medicines/${medicine.id}`} className="block h-full group relative">
      <div className="bg-card border border-border/50 rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 flex flex-col h-full relative overflow-hidden">
        
        {/* Favorite Icon */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-red-50 border border-border/50 transition-all group-hover:opacity-100 opacity-80"
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-500'}`} />
        </button>

        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-white mb-4 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={imgSrc}
              alt={medicine.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out p-2"
              onError={() => setImgSrc(DEFAULT_IMAGE)}
            />
          </div>
          {medicine.requiredPrescription && (
            <div className="absolute bottom-2 left-2 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded border border-orange-200 uppercase tracking-wider shadow-sm z-10">
              Rx Required
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <span className="text-xs font-bold text-primary/80 mb-1 line-clamp-1 uppercase tracking-wider">
            {medicine.manufacturer}
          </span>
          <h3 className="font-bold text-base text-foreground line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors">
            {medicine.name}
          </h3>
          
          <div className="mt-auto pt-3 flex items-end justify-between border-t border-border/30">
            <div>
              <p className="text-xs text-muted-foreground line-through mb-0.5">
                ৳ {(medicine.price * 1.2).toFixed(2)}
              </p>
              <p className="font-black text-xl text-foreground tracking-tight">
                ৳ {medicine.price.toFixed(2)}
              </p>
            </div>
            
            <Button
              onClick={handleAddToCart}
              size="icon"
              className="rounded-lg h-10 w-10 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground shadow-none transition-all group-hover:shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
