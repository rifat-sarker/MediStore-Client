"use client";
import Image from "next/image";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import banner from "@/app/assets/banner.png";
import banner2 from "@/app/assets/banner2.png";
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className=""
    >
      <CarouselContent>
        <CarouselItem className="flex justify-center">
          <Image src={banner} alt="banner-photo" className="w-full h-[450px]" />
        </CarouselItem>
        <CarouselItem className="flex justify-center">
          <Image
            src={banner2}
            alt="banner-photo"
            className="w-full h-[450px]"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Banner;
