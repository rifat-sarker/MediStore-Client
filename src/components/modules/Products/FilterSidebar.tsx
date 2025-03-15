"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ICategory } from "@/types/category";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const FilterSidebar = ({ categories }: { categories: ICategory[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [price, setPrice] = useState<number>(500);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.push(`/shop?${params.toString()}`);
  };

  const handlePriceChange = (value: number) => {
    setPrice(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("maxPrice", String(value));
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <Card className="p-4 text-black rounded-md shadow-md w-72">
      <CardContent>
        <h2 className="text-lg font-semibold">Filter by Price</h2>
        <Slider
          value={[price]}
          min={0}
          max={1000}
          step={10}
          onValueChange={(val) => handlePriceChange(val[0])}
        />
        <p className="text-sm text-gray-500 mt-2">Max Price: ${price}</p>

        <h2 className="text-lg font-semibold mt-6">Categories</h2>
        <ul className="space-y-2 mt-2">
          {categories?.map((category, index) => (
            <li key={index} className="flex items-center gap-2">
              <Checkbox
                checked={searchParams.get("category") === category.name}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.name, checked as boolean)
                }
              />
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
