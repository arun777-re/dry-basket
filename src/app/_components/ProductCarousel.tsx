'use client'
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import DummyComponent from "../_components/DummyComponent";
import ProductCard from "./card/ProductCard";
import { ProductIncomingDTO } from '@/types/product';

interface DataProps {
  product: ProductIncomingDTO[]
}

const ProductCarousel: React.FC<DataProps> = ({ product }) => {

  const autoREf = Autoplay({
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const opts: Partial<EmblaOptionsType> = {
    align: "start" as const,
    containScroll: "trimSnaps" as const,
     slidesToScroll:1
  };

  const validProductData = product && Array.isArray(product) ? product.filter((i)=> i._id && i._id.trim() !== "") : [];

  return (
    <div className="w-full max-w-screen relative mx-auto">
      <Carousel
        opts={opts}
        plugins={[autoREf]}
        className="w-full relative h-auto flex flex-col"
      >
        <CarouselContent className="-ml-0 box-border w-full flex relative h-auto
         flex-row py-2 sm:py-6">
          {validProductData.length > 0 ? (
            validProductData.map((item, key) => (
              <CarouselItem
                key={key}
                className="
                  basis-full 
                  max-w-full:basis-full 
                  sm:basis-1/2 
                  md:basis-1/3 
                  lg:basis-1/4 
                  xl:basis-1/5 
                  px-1 
                "
              >
                <div className="mx-auto w-full relative h-auto md:w-[90%]">
                <ProductCard
                  key={item._id}
                  productId={item?._id}
                  {...item}
                />
                </div>

              </CarouselItem>
            ))
          ) : (
            <DummyComponent />
          )}
        </CarouselContent>
        <div className="flex justify-center items-center absolute align-middle gap-4 top-140 sm:top-104 -translate-x-1/2 left-1/2">
         <CarouselPrevious className="absolute cursor-pointer border-2 border-head"/>
        <CarouselNext className="absolute  cursor-pointer border-2 border-head"/>
        </div>

      </Carousel>
    </div>
  );
};

export default ProductCarousel;
