"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import Button from "../_components/Button";
import ProductCard from "../_components/card/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";

const BestProducts: React.FC = () => {
  // here actual data comes from api
  const products = [
    {
      id: 1,
      image1: "/images/card1-1.jpg",
      image2: "/images/card1-2.jpg",
      title: "Almonds",
      price: "1200",
    },
    {
      id: 2,
      image1: "/images/card2-1.jpg",
      image2: "/images/card2-2.jpg",
      title: "Ceshews",
      price: "1200",
    },
    {
      id: 3,
      image1: "/images/card3-2.jpg",
      image2: "/images/card3-1.jpg",
      title: "WallNut",
      price: "1200",
    },
    {
      id: 4,
      image1: "/images/card1-1.jpg",
      image2: "/images/card1-2.jpg",
      title: "Almonds",
      price: "1200",
    },
    {
      id: 5,
      image1: "/images/card2-1.jpg",
      image2: "/images/card2-2.jpg",
      title: "Ceshews",
      price: "1200",
    },
    {
      id: 6,
      image1: "/images/card3-2.jpg",
      image2: "/images/card3-1.jpg",
      title: "WallNut",
      price: "1200",
    },
    {
      id: 7,
      image1: "/images/card3-2.jpg",
      image2: "/images/card3-1.jpg",
      title: "WallNut",
      price: "1200",
    },
    {
      id: 8,
      image1: "/images/card1-1.jpg",
      image2: "/images/card1-2.jpg",
      title: "Almonds",
      price: "1200",
    },
    {
      id: 9,
      image1: "/images/card2-1.jpg",
      image2: "/images/card2-2.jpg",
      title: "Ceshews",
      price: "1200",
    },

    
  ];

  const autoREf = Autoplay({
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const opts:Partial<EmblaOptionsType> = {
    align:'start' as const,
    containScroll:'trimSnaps' as const,
  }
  return (
    <section className="max-w-screen w-full relative min-h-screen mx-auto ">
      <div className="relative w-full flex flex-col items-center justify-center px-32 pt-16 pb-10">
        <header className="relative max-w-md w-full flex flex-col items-center justify-center ">
          <article className="w-full relative flex items-center flex-col">
            <h2>Best Products</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <div className="flex gap-2 items-center p-2">
              <FaStar size={18} className="text-first " />
              <FaStar size={25} className="text-body" />
              <FaStar size={18} className="text-first " />
            </div>
          </article>
          <div className="relative flex items-center w-full justify-center gap-8 py-8">
            <Button className="bg-first drop-shadow-black/30 drop-shadow-xl border-2 border-first text-body tracking-wide">
              Dried seeds
            </Button>
            <Button
              className="bg-white border-2 border-head  hover:bg-first hover:border-first
                 text-body tracking-wide
                 hover:drop-shadow-xl hover:drop-shadow-black/30
                 transition-all duration-300 ease-in-out"
            >
              Spicy Masalas
            </Button>
          </div>
        </header>
      <section className="w-full max-w-screen relative">
<Carousel opts={opts} plugins={[autoREf]} className="w-full max-w-full relative flex flex-col">
  <CarouselContent className="-ml-0 border-box w-full flex flex-row gap-0 pb-10 pt-10">
    {products.map((item, key) => (
      <CarouselItem
  key={key}
  className="md:pl-1 lg:pl-2 basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5 px-2"
>
        <ProductCard
          image1={item.image1}
          image2={item.image2}
          title={item.title}
          price={item.price}
          id={item.id}
        />
      </CarouselItem>
    ))}
  </CarouselContent>

    <CarouselPrevious />
    <CarouselNext />
</Carousel>


</section>

      </div>
    </section>
  );
};

export default BestProducts;
