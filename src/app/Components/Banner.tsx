"use client";

import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

// here actual banners are come from backend
const banners = [
  {
    id: 1,
    image: "/images/banner-1.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
  {
    id: 2,
    image: "/images/banner-2.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
  {
    id: 3,
    image: "/images/banner-3.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
  {
    id: 4,
    image: "/images/banner-4.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
  {
    id: 5,
    image: "/images/banner-5.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
];
const Banner: React.FC = () => {
  const autoplay = useRef(
    Autoplay({
      stopOnInteraction: false,
      delay: 3000,
      stopOnMouseEnter: true,
    })
  );
  return (
    <section className="max-w-screen w-full relative min-h-screen h-[106vh] -mt-42 ">
      <Carousel className="relative w-full" plugins={[autoplay.current]}>
        <CarouselContent className="w-full relative h-full flex items-center justify-center overflow-x-hidden">
          {banners.map((item, key) => {
            return (
              <CarouselItem
                key={key}
                className="w-screen h-[106vh] relative basis-full flex-shrink-0 flex-grow-0"
              >
                <div className="w-full h-[106vh] top-0 left-0 relative">
                  <div className="w-screen h-full relative z-0">
                    <Image
                      src={item.image}
                      alt="banner"
                      fill
                      priority
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="absolute h-full w-full inset-0 transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 z-10 bg-black/30 flex-grow-0 flex-shrink-0">
                    <article className="flex flex-col items-center relative justify-center gap-4 top-[10%] z-40 h-full w-full">
                      <h1>{item?.title}</h1>
                      <p className="text-4xl font-medium text-first tracking-wide">
                        {item?.subheading}
                      </p>
                      <span className="text-2xl text-first tracking-wide">
                        USE COUPAN : {item?.coupan}
                      </span>
                    </article>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between z-50 pointer-events-none">
          <div className="pl-4 pointer-events-auto">
            <CarouselPrevious className="">
              <FaChevronCircleLeft size={20} />
            </CarouselPrevious>
          </div>
          <div className="pr-12 pointer-events-auto">
            <CarouselNext className="bg-transparent border-none p-0 hover:text-first">
              <FaChevronCircleRight
                size={20}
                className="text-black hover:text-first"
              />
            </CarouselNext>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
