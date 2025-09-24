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
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const opts: Partial<EmblaOptionsType> = {
    align: "start" as const,
    containScroll: "trimSnaps" as const,
    loop:true,
     slidesToScroll:1

  };

  return (
    <div className="w-full max-w-screen relative px-2 sm:px-4">
      <Carousel
        opts={opts}
        plugins={[autoREf]}
        className="w-full relative flex flex-col "
      >
        <CarouselContent className="-ml-0 box-border w-full flex
         flex-row gap-2 sm:gap-3 md:gap-2 lg:gap-0 pb-6 pt-6 ">
          {product && product.length > 0 ? (
            product.map((item, key) => (
              <CarouselItem
                key={key}
                className="
                  basis-full
                  max-w-full:basis-full
                  sm:basis-1/2 
                  md:basis-1/3 
                  lg:basis-1/4 
                  xl:basis-1/5
                "
              >
                <ProductCard
                  key={item._id}
                  productId={item?._id}
                  {...item}
                />
              </CarouselItem>
            ))
          ) : (
            <DummyComponent />
          )}
        </CarouselContent>
        <div className="flex justify-center items-center absolute align-middle gap-4 top-104 -translate-x-1/2 left-1/2">
         <CarouselPrevious className="hidden sm:flex absolute cursor-pointer border-2 border-head " />
        <CarouselNext className="hidden sm:flex absolute  cursor-pointer border-2 border-head " />
        </div>

      </Carousel>
    </div>
  );
};

export default ProductCarousel;
