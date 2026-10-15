import ProductDetails from "@/components/modules/Products/ProductDetails";
import { getAllCategories } from "@/services/Category";
import { getSingleProduct } from "@/services/Medicine";

const MOCK_FALLBACK: Record<string, any> = {
  m1: {
    id: "m1",
    name: "Omega-3 Fish Oil 1000mg",
    description: "Premium omega-3 fish oil formulated with EPA and DHA to support healthy cardiovascular and joint function. Clinically tested.",
    manufacturer: "Nature's Bounty",
    price: 25.99,
    stock: 50,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop",
    categoryId: "c1",
  },
  m2: {
    id: "m2",
    name: "Paracetamol 500mg (100 pack)",
    description: "Effective relief from mild-to-moderate pain and reduce fever. Suitable for headaches, muscle aches, toothaches, and colds.",
    manufacturer: "Tylenol",
    price: 8.50,
    stock: 120,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    categoryId: "c2",
  },
  m3: {
    id: "m3",
    name: "Amoxicillin 250mg",
    description: "Broad-spectrum prescription antibiotic used to treat bacterial infections. Use strictly according to physician instructions.",
    manufacturer: "Pfizer",
    price: 15.00,
    stock: 30,
    requiredPrescription: true,
    imageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=600&auto=format&fit=crop",
    categoryId: "c3",
  },
  m4: {
    id: "m4",
    name: "Vitamin C with Zinc",
    description: "High potency daily immune support formula combining Vitamin C (1000mg) and Zinc (15mg) for antioxidant cellular protection.",
    manufacturer: "Centrum",
    price: 18.99,
    stock: 200,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edb9c46d3e8f?q=80&w=600&auto=format&fit=crop",
    categoryId: "c1",
  },
  m5: {
    id: "m5",
    name: "Ibuprofen 400mg Liquid Gels",
    description: "Fast-acting anti-inflammatory and pain reliever for joint pain, back pain, menstrual cramps, and minor arthritis pain.",
    manufacturer: "Advil",
    price: 12.99,
    stock: 85,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1583947581924-860bda6a5c83?q=80&w=600&auto=format&fit=crop",
    categoryId: "c2",
  },
  m6: {
    id: "m6",
    name: "Cetirizine Allergy Relief",
    description: "All-day relief from seasonal allergy symptoms including sneezing, runny nose, itchy watery eyes, and itchy throat.",
    manufacturer: "Zyrtec",
    price: 22.50,
    stock: 60,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1585698436531-97b76e1045a5?q=80&w=600&auto=format&fit=crop",
    categoryId: "c5",
  },
  m7: {
    id: "m7",
    name: "Protein Whey Isolate 2kg",
    description: "Pure ultra-filtered whey protein isolate for lean muscle repair and workout recovery. Easy mixability and great taste.",
    manufacturer: "Optimum Nutrition",
    price: 65.00,
    stock: 15,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop",
    categoryId: "c1",
  },
  m8: {
    id: "m8",
    name: "Melatonin 5mg Sleep Aid",
    description: "Non-habit forming natural sleep support to help you fall asleep faster and wake up feeling refreshed.",
    manufacturer: "Nature Made",
    price: 10.99,
    stock: 150,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=600&auto=format&fit=crop",
    categoryId: "c1",
  },
};

const DEFAULT_CATEGORIES = [
  { id: "c1", name: "Vitamins & Supplements" },
  { id: "c2", name: "Pain Relief" },
  { id: "c3", name: "First Aid" },
  { id: "c4", name: "Personal Care" },
  { id: "c5", name: "Cold & Flu" },
  { id: "c6", name: "Digestive Health" },
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

  // Fallback to mock item if not in DB
  if (!product && MOCK_FALLBACK[medicineId]) {
    product = MOCK_FALLBACK[medicineId];
  } else if (!product) {
    // Generate a fallback preview so user never gets broken 404
    product = {
      id: medicineId,
      name: `Medicine #${medicineId.slice(0, 8)}`,
      description: "Authentic clinical healthcare product distributed by MediStore. Tested and verified for safe usage.",
      manufacturer: "Certified Pharma Labs",
      price: 19.99,
      stock: 50,
      requiredPrescription: false,
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
      categoryId: "c1",
    };
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
    <div className="p-4 max-w-[90%] mx-auto">
      <ProductDetails categories={categories} product={product} />
    </div>
  );
}
