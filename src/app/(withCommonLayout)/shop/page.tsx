import CategoryCard from "@/components/modules/home/Category/CategoryCard";
import AllProducts from "@/components/modules/Products";
import { getAllCategories } from "@/services/Category";
import { getAllProduct } from "@/services/Medicine";
import { ICategory } from "@/types/category";

const ShopPage = async () => {
  const { data: products } = await getAllProduct();
  const { data: categories } = await getAllCategories();
  // console.log(medinices);

  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold my-5">Featured Collection </h2> */}
      {/* <div className="grid grid-cols-6 gap-6">
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div> */}
      <AllProducts categories={categories} products={products} />
    </div>
  );
};

export default ShopPage;
