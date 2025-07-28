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
import { ItemProps } from "@/lib/type";
import ProductCard from "../_components/card/ProductCard";


interface DataProps {
    product:ItemProps[]
}
const ProductCarousel:React.FC<DataProps> = ({
    product
}) => {



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
    <div className="w-full max-w-screen relative">
          <Carousel
            opts={opts}
            plugins={[autoREf]}
            className="w-full max-w-full relative flex flex-col"
          >
            <CarouselContent className="-ml-0 border-box w-full flex flex-row gap-0 pb-10 pt-10">
              {product && product.length>0 ? (product.map((item, key) => (
                <CarouselItem
                  key={key}
                  className="md:pl-1 lg:pl-2 basis-full md:basis-1/3 lg:basis-1/4 xl:basis-1/5 px-2"
                >
                  <ProductCard key={item._id} productId={item?._id} {...item}
                  />
                </CarouselItem>
              ))) : (
                <DummyComponent/>
              )}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
  )
}

export default ProductCarousel