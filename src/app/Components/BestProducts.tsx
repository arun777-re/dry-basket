"use client";
import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { getProduct } from "@/redux/slices/productSlice";
import { ItemProps } from "@/lib/type";
import DummyComponent from "../_components/DummyComponent";

const BestProducts: React.FC = () => {
  const [product, setProduct] = React.useState<ItemProps[]>([]);

  // here actual data comes from api
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getProduct())
      .unwrap()
      .then((res) => {
        setProduct(res?.data);
      });
  }, [dispatch]);

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
        </section>
      </div>
    </section>
  );
};

export default BestProducts;
