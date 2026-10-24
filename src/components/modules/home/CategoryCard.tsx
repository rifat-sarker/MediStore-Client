"use client";

import Link from "next/link";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  imageUrl: string | null;
}

const DEFAULT_CATEGORY_FALLBACK = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop";

export default function CategoryCard({ category }: { category: Category }) {
  const [imgSrc, setImgSrc] = useState(category.imageUrl || DEFAULT_CATEGORY_FALLBACK);

  return (
    <Link 
      href={`/medicines?category=${encodeURIComponent(category.name)}`}
      className="group relative overflow-hidden rounded-2xl glass-card border border-border/50 hover:border-primary/30 transition-all duration-300 block hover:-translate-y-1"
    >
      <div className="aspect-square p-6 flex flex-col items-center justify-center text-center space-y-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-secondary mb-2 group-hover:scale-110 transition-transform duration-500 shadow-inner">
          <img 
            src={imgSrc} 
            alt={category.name} 
            onError={() => setImgSrc(DEFAULT_CATEGORY_FALLBACK)}
            className="w-full h-full object-cover" 
          />
        </div>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
