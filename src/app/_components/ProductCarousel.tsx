'use client'
import React from 'react';

import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import DummyComponent from "../_components/DummyComponent";
import ProductCard from "./card/ProductCard";
import { ProductIncomingDTO } from '@/types/product';
import useEmblaCarousel from 'embla-carousel-react';

interface DataProps {
  product: ProductIncomingDTO[]
}

const ProductCarousel: React.FC<DataProps> = ({ product }) => {

  const autoplay = React.useRef(
    Autoplay({
      delay: 2600,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [autoplay.current]
  );

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const validProductData = product && Array.isArray(product)
    ? product.filter(i => i._id && i._id.trim() !== "")
    : [];

  return (
     <div className="w-full px-4 md:px-16 h-auto ">
        <div className="embla w-full relative overflow-hidden" ref={emblaRef} >
          <div className="embla__container flex gap-4 ml-2 sm:ml-0 sm:px-4 rounded-lg py-10  ">
            {validProductData.map((project, index) => (
              <div
                key={index}
                className="
                  embla__slide
                  shrink-0
                  basis-full 
                  md:basis-1/2 
                  lg:basis-1/3 
                 
                "
              >
                <ProductCard {...project}  />
              </div>
            ))}
          </div>


        </div>
        <div className="relative flex gap-4 top-0 justify-center z-20 items-center left-1/2 transform -translate-x-1/2">
          {/* Buttons */}
          <button
            onClick={scrollPrev}
            className=" bg-accent/20 p-2 rounded-full cursor-pointer w-10 h-10 hover:bg-accent/40 transition-colors duration-300"
          >
            ‹
          </button>

          <button
            onClick={scrollNext}
            className="bg-accent/20 p-2 rounded-full cursor-pointer w-10 h-10 hover:bg-accent/40 transition-colors duration-300"
          >
            ›
          </button>
</div>
      </div>
  );
};

export default ProductCarousel;
