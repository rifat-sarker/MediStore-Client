import { getAllCategories } from "@/services/Category";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ICategory } from "@/types/category";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Category = async () => {
  const { data: categories } = await getAllCategories();
  console.log(categories);
  return (
    <div className="my-4">
      <Carousel className="max-w-[90%] mx-auto p-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between my-4">
          <h1 className="text-3xl font-bold my-2">Category</h1>
          <Link href={"/"}>
            <Button>View All</Button>
          </Link>
        </div>

        {/* Carousel Navigation */}
        <CarouselPrevious className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10" />

        {/* Carousel Content */}
        <CarouselContent className="flex items-center">
          {categories.map((category:ICategory) => (
            <CarouselItem
              key={category._id}
              className="lg:basis-1/6 md:basis-1/5 sm:basis-1/4 basis-1/3 flex"
            >
              <Card className="w-full h-[150px] flex flex-col items-center justify-center p-4">
                <CardContent className="flex flex-col items-center space-y-2 w-full">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-20 h-20 object-cover p-2"
                  />
                  <p className="text-sm text-black font-medium">
                    {category.name}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Category;
