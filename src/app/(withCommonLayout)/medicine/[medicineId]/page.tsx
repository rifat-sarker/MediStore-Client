import ProductDetails from "@/components/modules/Products/ProductDetails";
import { getSingleProduct } from "@/services/Medicine";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ medicineId: string }>;
}) => {
  const { medicineId } = await params;
  console.log(params, medicineId);
  const { data: product } = await getSingleProduct(medicineId);
  console.log(product);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default MedicineDetailsPage;
