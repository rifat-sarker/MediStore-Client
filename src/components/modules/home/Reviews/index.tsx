import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      comment: "Great service and fast delivery!",
      image: "https://i.ibb.co.com/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      comment: "Quality medicines at the best prices.",
      image: "https://i.ibb.co.com/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg",
    },
    {
      id: 3,
      name: "Michael Lee",
      comment: "Easy to order, highly recommend!",
      image: "https://i.ibb.co.com/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg",
    },
    {
      id: 4,
      name: "Emily Davis",
      comment: "Customer support was very helpful.",
      image: "https://i.ibb.co.com/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg",
    },
    {
      id: 5,
      name: "Chris Wilson",
      comment: "Found everything I needed in one place.",
      image: "https://i.ibb.co.com/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg",
    },
    {
      id: 6,
      name: "Sarah Brown",
      comment: "Will definitely order again!",
      image: "https://i.ibb.co.com/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg",
    },
  ];

  return (
    <div className="mx-auto py-12">
      <div className="flex items-center justify-between my-4 max-w-[90%] mx-auto">
        <h1 className="text-2xl font-semibold my-2">Customer Reviews</h1>
        <Link
          className="text-sm text-primary font-semibold border px-2 py-1"
          href={"/"}
        >
          See More...
        </Link>
      </div>

      <Carousel className="max-w-[90%] mx-auto p-4">
        <div className="relative">
          <CarouselPrevious className="absolute left-[-40px] top-1/2 -translate-y-1/2 transform z-10 bg-transparent p-2 rounded-full shadow-md" />
          <CarouselNext className="absolute right-[-40px] top-1/2 -translate-y-1/2 transform z-10 p-2 rounded-full shadow-md" />
          <CarouselContent className="flex items-center">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="lg:basis-1/6 md:basis-1/2 sm:basis-1/2 basis-full px-2"
              >
                <Card className="w-full h-[220px] flex flex-col items-center justify-center p-6 shadow-lg">
                  <CardContent className="flex flex-col items-center space-y-4 w-full text-center">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <p className="text-sm font-medium text-gray-800">
                      {review.comment}
                    </p>
                    <span className="text-sm text-gray-500">
                      - {review.name}
                    </span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
};

export default CustomerReviews;
