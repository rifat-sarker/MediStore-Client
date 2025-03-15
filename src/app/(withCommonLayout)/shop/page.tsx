import CategoryCard from "@/components/modules/home/Category/CategoryCard";
import AllProducts from "@/components/modules/Products";
import { getAllCategories } from "@/services/Category";
import { getAllProduct } from "@/services/Medicine";
import { ICategory } from "@/types/category";
import { SearchParams } from "@/types/common";


const ShopPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { minPrice, maxPrice, categories } =  searchParams;

  const { data: products } = await getAllProduct({
    minPrice,
    maxPrice,
    categories,
  });
  const { data: categoriesData } = await getAllCategories();

  return (
    <div className="p-4">
      <AllProducts categories={categoriesData} products={products} />
    </div>
  );
};

export default ShopPage;
