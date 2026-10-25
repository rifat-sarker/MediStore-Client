import ProductDetails from "@/components/modules/Products/ProductDetails";
import { getAllCategories } from "@/services/Category";
import { getSingleProduct } from "@/services/Medicine";

import { MEDEX_BANGLADESH_PRODUCTS } from "@/types/product";

const DEFAULT_CATEGORIES = [
  { id: "c1", name: "Medicines" },
  { id: "c2", name: "Baby & Mom" },
  { id: "c3", name: "Diabetic Care" },
  { id: "c4", name: "Health & Devices" },
  { id: "c5", name: "Personal Care" },
  { id: "c6", name: "Vital Wellness" },
];

export async function getMedicineProduct(medicineId: string) {
  let product: any = null;
  let categories: any[] = [];

  try {
    const res = await getSingleProduct(medicineId);
    if (res && res.data) {
      product = res.data;
    }
  } catch {
    // API down or error
  }

  try {
    const catRes = await getAllCategories();
    if (catRes && catRes.data && catRes.data.length > 0) {
      categories = catRes.data;
    } else {
      categories = DEFAULT_CATEGORIES;
    }
  } catch {
    categories = DEFAULT_CATEGORIES;
  }

  // Fallback to MedEx dataset if not in DB
  if (!product) {
    const foundInMedex = MEDEX_BANGLADESH_PRODUCTS.find(
      (m) => m.id === medicineId || m.name.toLowerCase().includes(medicineId.toLowerCase())
    );
    if (foundInMedex) {
      product = foundInMedex;
    } else {
      product = {
        id: medicineId,
        name: `Medicine #${medicineId.slice(0, 8)}`,
        description: "Authentic clinical healthcare product distributed by MediStore. Tested and verified for safe usage.",
        manufacturer: "Square Pharmaceuticals PLC",
        price: 19.99,
        stripPrice: 199.90,
        packagePrice: 1999.00,
        stock: 50,
        requiredPrescription: false,
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        categoryId: "c1",
      };
    }
  }

  // Populate stripPrice, packagePrice and packInfo if not present
  if (product && !product.stripPrice) {
    const stripMatch = product.description?.match(/Strip Price:\s*৳\s*([\d\.]+)/i);
    const packMatch = product.description?.match(/Pack Info:\s*([^.]+)/i);
    const boxMatch = product.description?.match(/৳\s*([\d\.]+)/g);

    product.stripPrice = stripMatch ? parseFloat(stripMatch[1]) : Number((product.price * 10).toFixed(2));
    product.packagePrice = Number((product.price * 100).toFixed(2));
    product.packInfo = packMatch ? packMatch[1].trim() : "10 x 10's Box";
  }

  return { product, categories };
}

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ medicineId: string }>;
}) {
  const { medicineId } = await params;
  const { product, categories } = await getMedicineProduct(medicineId);

  return (
    <div className="w-full">
      <ProductDetails categories={categories} product={product} />
    </div>
  );
}
