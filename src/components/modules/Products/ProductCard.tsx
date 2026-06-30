import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IProduct } from "@/types/product";

import {
  Heart,
  PlusIcon,
  ShoppingCart,
  Star,
  WashingMachine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";

const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddToWishlit = async () => {
    toast.error("Wishlist feature is currently disabled");
  };

  const handleAddToCart = () => {
    dispatch(addProduct(product));
    toast.success("Added to Cart!");
  };

  return (
    <div className="relative border p-4 rounded-md h-[280px] flex flex-col justify-between items-center text-center">
      <Link href={`/medicine/${product.id}`}>
        <img
          src={product.imageUrl || ""}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
      </Link>
      <button onClick={handleAddToWishlit} className="absolute right-2 top-2">
        <Heart className="size-6 text-primary" />
      </button>
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-sm font-medium">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1">MRP. {product.price}</p>
      </div>
      <button 
        onClick={handleAddToCart}
        className="mt-auto text-sm font-semibold border-primary text-primary border px-4 py-2 w-full flex items-center justify-center gap-1 hover:text-white hover:bg-primary"
      >
        <PlusIcon className="size-4" /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
