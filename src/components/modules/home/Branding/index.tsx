import { Card, CardContent } from "@/components/ui/card";
import { getAllProduct } from "@/services/Medicine";
import { IProduct } from "@/types/product";

const BrandingSection = async () => {
  const { data: productInfo } = await getAllProduct();

  if (!productInfo || productInfo.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Trusted Brands</h2>
        <p className="text-gray-500">
          No brand information available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[90%] mx-auto py-12 ">
      <div>
        <h2 className="text-2xl text-left font-semibold mb-6 text-gray-900 dark:text-white">
          Our Trusted Brands
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {productInfo.slice(0, 5).map((product: any) => (
          <Card
            key={product._id}
            className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center"
          >
            <img
              src={product.category?.icon}
              alt={product.brand}
              className="w-16 h-16 object-contain opacity-90 mb-2"
            />

            <h3 className="text-lg font-semibold">{product.brand}</h3>
            <p className="text-gray-600 text-xs dark:text-gray-400 mb-2">
              By {product.manufacturer}
            </p>

            <p className="text-gray-700 dark:text-gray-300 text-sm text-center">
              {product.description.length > 80
                ? product.description.slice(0, 80) + "..."
                : product.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrandingSection;
