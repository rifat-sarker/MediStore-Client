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
            : (product.category as ICategory)?.name;

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
    <div className="flex flex-col lg:flex-row gap-8 my-10">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4">
        <FilterSidebar categories={categories} />
      </div>

      {/* Products Grid */}
      <div className="w-full lg:w-3/4">
        <h2 className="text-xl font-bold my-4">All Products</h2>
        {filteredProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
