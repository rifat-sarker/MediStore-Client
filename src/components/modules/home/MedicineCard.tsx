import { ShoppingBag } from "lucide-react";
import Link from "next/link";

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  requiredPrescription: boolean;
}

export default function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <div className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full">
      {medicine.requiredPrescription && (
        <div className="absolute top-3 right-3 z-10 bg-destructive/10 text-destructive px-2 py-1 rounded-md text-xs font-semibold backdrop-blur-md">
          Rx Required
        </div>
      )}
      
      <Link href={`/medicine/${medicine.id}`} className="block relative aspect-[4/3] overflow-hidden bg-secondary/30">
        {medicine.imageUrl ? (
          <img 
            src={medicine.imageUrl} 
            alt={medicine.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <Link href={`/medicine/${medicine.id}`}>
            <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors line-clamp-1">
              {medicine.name}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {medicine.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="font-bold text-xl text-primary">
            ${medicine.price.toFixed(2)}
          </div>
          <button className="flex items-center justify-center bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground w-10 h-10 rounded-full transition-colors">
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
