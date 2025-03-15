import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { IType } from "@/types/type";
import { ICategory } from "@/types/category";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ProductDetails = ({
  product,
  categories,
  types,
}: {
  product: IProduct;
  categories: ICategory[];
  types: IType[];
}) => {
  console.log(product);
  const productCategory = categories.find(
    (category) => category._id === product.category
  );
  const productType = types.find((type) => type._id === product.type);

  return (
    <div className="p-4 space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList className="text-gray-600 text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="hover:text-primary">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shop" className="hover:text-primary">
              Medicine
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-gray-900 font-medium">
              {product.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-full md:w-1/2 space-y-6 flex flex-col items-center">
          <img
            src={product?.image}
            alt={product.name}
            className="w-72 h-72 md:w-80 md:h-80 object-cover border p-4 rounded-md transition-all duration-300 hover:scale-105"
          />
          <Tabs defaultValue="product_details" className="w-full max-w-md">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="product_details">Details</TabsTrigger>
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="review">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="product_details">
              <p className="text-gray-600">{product?.description}</p>
            </TabsContent>
            <TabsContent value="information">
              <Table>
                <TableBody>
                  {[
                    { label: "Name", value: product.name },
                    { label: "Brand", value: product.brand },
                    { label: "Category", value: productCategory?.name },
                    { label: "Type", value: productType?.name },
                    { label: "Manufacturer", value: product.manufacturer },
                    { label: "Stock", value: product.stock },
                    { label: "Amount", value: `৳ ${product.price}` },
                    { label: "Expiry Date", value: product.expiryDate },
                  ].map(({ label, value }, index) => (
                    <TableRow key={index}>
                      <TableHead className="w-[150px] text-gray-700">
                        {label}
                      </TableHead>
                      <TableCell className="text-gray-900">{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="review">
              <p className="text-gray-500">No reviews yet.</p>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
          <h2 className="font-semibold text-2xl text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-600">Brand: {product.brand}</p>
          <p className="text-gray-600">Availability: {product.availability == true ? "In Stock" : "Out of Stock"}</p>
          <p className="text-2xl font-semibold text-primary">
            ৳ {product.price}
          </p>
          <button className="mt-auto text-sm font-semibold border-primary text-primary border px-4 py-2 flex mx-auto md:mx-0 items-center justify-center gap-1 hover:text-white hover:bg-primary">
            <ShoppingCart className="size-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
