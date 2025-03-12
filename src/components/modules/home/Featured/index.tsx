import { Button } from "@/components/ui/button";
import { getAllProduct } from "@/services/Medicine";
import { IProduct } from "@/types/product";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeaturedProducts = async () => {
  const { data: products } = await getAllProduct();
  //   console.log(medicines);
  return (
    <div>
      <div className="flex items-center justify-between my-4 max-w-[90%] mx-auto">
        <h1 className="text-2xl font-semibold my-2">Featured Products</h1>
        <Link
          className="text-sm text-primary font-semibold border px-2 py-1"
          href={"/"}
        >
          See More...
        </Link>
      </div>
      <div>
        <Carousel className="max-w-[90%] mx-auto p-4">
          <div className="relative">
            <CarouselPrevious className="absolute left-[-40px] top-1/2 -translate-y-1/2 transform z-10 bg-transparent p-2 rounded-full shadow-md" />
            <CarouselNext className="absolute right-[-40px] top-1/2 -translate-y-1/2 transform z-10 p-2 rounded-full shadow-md" />
            <CarouselContent className="flex items-center mx-auto">
              {products?.slice(0, 10).map((product: IProduct) => (
                <CarouselItem
                  key={product._id}
                  className="lg:basis-1/6 md:basis-1/5 sm:basis-1/4 basis-1/3"
                >
                  <div className="border p-4 rounded-md h-[280px] flex flex-col justify-between items-center text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-sm font-medium">{product.name}</h2>
                      <p className="text-gray-600 text-sm mt-1">
                        MRP. {product.price}
                      </p>
                    </div>
                    <button className="mt-auto text-sm font-semibold border-primary text-primary border px-4 py-2 w-full flex items-center justify-center gap-1 hover:text-white hover:bg-primary">
                      <PlusIcon className="size-4" /> Add to Cart
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedProducts;
