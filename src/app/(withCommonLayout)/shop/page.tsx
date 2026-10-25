import CategoryCard from "@/components/modules/home/Category/CategoryCard";
import AllProducts from "@/components/modules/Products";
import { getAllCategories } from "@/services/Category";
import { getAllProduct } from "@/services/Medicine";
import { ICategory } from "@/types/category";
import { SearchParams } from "@/types/common";


const ShopPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const { minPrice, maxPrice, categories, page, limit, searchTerm } = await searchParams;

  const { data: products, meta } = await getAllProduct({
    minPrice,
    maxPrice,
    categories,
    page: page || "1",
    limit: limit || "10",
    searchTerm
  });
  const { data: categoriesData } = await getAllCategories();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <AllProducts categories={categoriesData} products={products || []} meta={meta} />
    </div>
  );
};

export default ShopPage;
