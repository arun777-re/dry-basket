import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import DummyComponent from "../_components/DummyComponent";
import ProductCard from "../_components/card/ProductCard";
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
  };

  return (
    <div className="w-full max-w-screen relative px-2 sm:px-4">
      <Carousel
        opts={opts}
        plugins={[autoREf]}
        className="w-full relative flex flex-col"
      >
        <CarouselContent className="-ml-0 box-border w-full flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 pb-6 pt-6">
          {product && product.length > 0 ? (
            product.map((item, key) => (
              <CarouselItem
                key={key}
                className="
                  basis-full 
                  sm:basis-1/2 
                  md:basis-1/3 
                  lg:basis-1/4 
                  xl:basis-1/5 
                  px-2
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

      </Carousel>
    </div>
  );
};

export default ProductCarousel;
