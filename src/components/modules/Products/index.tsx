import { IProduct } from "@/types/product";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { ICategory } from "@/types/category";
import CategoryCard from "../home/Category/CategoryCard";

const AllProducts = ({
  products,
  categories,
}: {
  products: IProduct[];
  categories: ICategory[];
}) => {
  return (
    <div className="flex gap-8 my-10">
      <div>
        <FilterSidebar products={products} categories={categories} />
      </div>
      <div className="">
        <h2 className="text-xl font-bold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-6 gap-6">
          {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
            <CategoryCard key={idx} category={category} />
          ))}
        </div>

        <h2 className="text-xl font-bold my-4">All Products</h2>
        <div className="grid grid-cols-6 gap-8">
          {products?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
