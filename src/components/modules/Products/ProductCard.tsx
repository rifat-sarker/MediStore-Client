"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IProduct } from "@/types/product";

import { Heart, PlusIcon, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Link href={`/medicine/${product._id}`}>
      <div className="border p-4 rounded-md h-[280px] flex flex-col justify-between items-center text-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-sm font-medium">{product.name}</h2>
          <p className="text-gray-600 text-sm mt-1">MRP. {product.price}</p>
        </div>
        <button className="mt-auto text-sm font-semibold border-primary text-primary border px-4 py-2 w-full flex items-center justify-center gap-1 hover:text-white hover:bg-primary">
          <PlusIcon className="size-4" /> Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
