"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import Button from "../_components/Button";
import ProductCard from "../_components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
      title: "Almonds",
      price: "1200",
    },
    {
      id: 3,
      image1: "/images/card3-2.jpg",
      image2: "/images/card3-1.jpg",
      title: "Almonds",
      price: "1200",
    },
    {
      id: 4,
      image1: "/images/card3-2.jpg",
      image2: "/images/card3-1.jpg",
      title: "Almonds",
      price: "1200",
    },
    {
      id: 5,
      image1: "/images/card3-2.jpg",
      image2: "/images/card3-1.jpg",
      title: "Almonds",
      price: "1200",
    },
    {
      id: 6,
      image1: "/images/card3-2.jpg",
      image2: "/images/card3-1.jpg",
      title: "Almonds",
      price: "1200",
    },
  ];

  const autoREf = React.useRef(Autoplay({
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  }));
  return (
    <section className="max-w-screen w-full relative min-h-screen mx-auto ">
      <div className="relative w-full flex flex-col items-center justify-center">
        <header className="relative max-w-md w-full flex flex-col items-center justify-center border border-amber-400">
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
      <section className="w-full py-20 border border-amber-800 flex items-center justify-centter">
  <Carousel plugins={[autoREf.current]} className="w-full border-8 border-amber-950 overflow-visible">
    <CarouselContent className="flex">
      {products.map((item, key) => (
        <CarouselItem key={key} className="w-[200px] basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 flex-shrink-0">
          <div className="p-2">
            <ProductCard image1={item.image1} image2={item.image2} title={item.title} price={item.price} id={item.id} />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
</section>

      </div>
    </section>
  );
};

export default BestProducts;
