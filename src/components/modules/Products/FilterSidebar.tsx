"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ICategory } from "@/types/category";
import { IProduct } from "@/types/product";
import { useState } from "react";

const FilterSidebar = ({categories, products}: {categories: ICategory[], products: IProduct[]}) => {
  const [price, setPrice] = useState(50);


  return (
    <Card className="p-4 text-black rounded-md shadow-md w-72">
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Filter By Price</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Min"
            className="border rounded px-2 py-1 w-full"
          />
          <input
            type="text"
            placeholder="Max"
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <Slider
          defaultValue={[price]}
          max={100}
          onValueChange={(val) => setPrice(val[0])}
        />
        <p className="mt-2">${price}</p>

        <h2 className="text-lg font-semibold mt-6">Categories</h2>
        <ul className="space-y-2 mt-2">
          {categories?.map((category, index) => (
            <li key={index} className="flex items-center gap-2">
              <Checkbox />
              <span>{category.name}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6">Product Type</h2>
        <ul className="space-y-2 mt-2">
          {products?.map((product, index) => (
            <li key={index} className="flex items-center gap-2">
              <Checkbox />
              <span>{product.brand}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
