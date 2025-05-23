"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import BannerCard from "../_components/card/BannerCard";
import { usePathname } from "next/navigation";
import Image from "next/image";

// here actual banners are come from backend
const banners = [
  {
    _id: 1,
    image: "/images/banner-1.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
  {
    _id: 2,
    image: "/images/banner-2.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
  {
    _id: 3,
    image: "/images/banner-3.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
  {
    _id: 4,
    image: "/images/banner-4.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
  {
    _id: 5,
    image: "/images/banner-5.jpg",
    title: "The Choice of Top Atheletes",
    subheading: "15% off on almonds",
    coupan: "SPI18",
  },
];
const Banner: React.FC = () => {

  // autoplay configuration of banner
  const autoplay = Autoplay({
    stopOnInteraction: false,
    delay: 5000,
    stopOnMouseEnter: true,
  });

  // options for carousel
  const opts: Partial<EmblaOptionsType> = {
    align: "start" as const,
    containScroll: "trimSnaps" as const,
  };

// get pathname
const path = usePathname();


  return (
    <>
    <section className={`${path === '/' ? 'visible' : 'hidden'} max-w-[100vw] w-full relative min-h-screen h-[106vh] -mt-42 mx-auto`}>
      <Carousel className="relative w-full " opts={opts} plugins={[autoplay]}>
        <CarouselContent className="w-full relative h-full flex gap-0 !p-0 !m-0">
          {banners.map((item, key) => {
            return (
              <CarouselItem
                key={key}
                className="w-full !p-0 !m-0 h-[106vh] relative basis-full flex-shrink-0 flex-grow-0" style={{flex:'0 0 100%'}}
              >
                <BannerCard
                {...item}
                
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md" />
      </Carousel>
    </section>
    <section className={` max-w-[100vw] w-full relative h-[60vh] -mt-42 mx-auto`}>
      <div className="relative w-full h-full">
        <div className="relative w-full h-full bg-black/30">
        <Image
        src={'/images/banner-6.jpg'}
        alt="banner-image"
        fill 
        priority
        className="object-center object-cover"
        />
          </div>
          <article className="w-full h-full top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 border-2 border-blue-700">
          <h1 className="text-white">The Full Cardamom</h1> 
          <p>Home / News</p>
          </article>
      </div>
    </section>
    </>

  );
};

export default Banner;
