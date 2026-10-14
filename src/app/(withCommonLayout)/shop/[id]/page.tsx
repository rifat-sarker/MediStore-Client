
import { redirect } from "next/navigation";

const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  redirect(`/medicine/${id}`);
};

export default ProductDetailsPage;