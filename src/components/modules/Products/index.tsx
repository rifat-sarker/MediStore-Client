"use client";

import { IProduct } from "@/types/product";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { ICategory } from "@/types/category";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const AllProducts = ({
  products,
  categories,
}: {
  products: IProduct[];
  categories: ICategory[];
}) => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);

 useEffect(() => {
   const selectedCategory = searchParams.get("category");
   const maxPrice = searchParams.get("maxPrice");

   let updatedProducts = products;

   if (selectedCategory) {
     updatedProducts = updatedProducts.filter((product) => {
       const categoryName =
         typeof product.category === "string"
           ? product.category
           : (product.category as ICategory)?.name; // If category is an object, get its name

       return categoryName?.toLowerCase() === selectedCategory.toLowerCase();
     });
   }

   if (maxPrice) {
     updatedProducts = updatedProducts.filter(
       (product) => product.price <= Number(maxPrice)
     );
   }

   setFilteredProducts(updatedProducts);
 }, [searchParams, products]);

  return (
    <div className="flex gap-8 my-10">
      <FilterSidebar categories={categories} />

      <div>
        <h2 className="text-xl font-bold my-4">All Products</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-6 gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-red-500 font-semibold text-lg mt-4">
            No products found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
