import ProductDetails from "@/components/modules/Products/ProductDetails";
import { getAllCategories } from "@/services/Category";
import { getSingleProduct } from "@/services/Medicine";
import { getAllTypes } from "@/services/Type";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ medicineId: string }>;
}) => {
  const { medicineId } = await params;
  const { data: product } = await getSingleProduct(medicineId);
  const { data: types } = await getAllTypes();
  const { data: categories } = await getAllCategories();

  return (
    <div className="p-4 max-w-[90%] mx-auto">
      <ProductDetails categories={categories} types={types} product={product} />
    </div>
  );
};

export default MedicineDetailsPage;
