"use client";
import React from "react";
import Button from "../_components/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface BgFixedProps {
  title?: string;
  heading?: string;
  subHeading?: string;
  image?: string;
}

const BgFixed: React.FC<BgFixedProps> = ({
  title,
  heading,
  subHeading,
  image,
}) => {
  const banners = useSelector((state: RootState) => state.banner.banners);

  return (
    <section
      style={{
        backgroundImage: `url(${image ?? "/images/banner-1.jpg"})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="w-full h-[450px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden"
    >
      <div className="absolute inset-0 z-10 bg-black/30 flex">
        <article
          className="
            flex flex-col gap-4
            px-4 py-10 sm:px-8 sm:py-12
            md:px-12 md:py-16
            w-full md:w-3/4 lg:w-1/2
            justify-center
          "
        >
          {title && (
            <p className="text-white text-sm sm:text-base">{title}</p>
          )}
          {heading && (
            <h1 className="text-first text-2xl sm:text-3xl md:text-4xl max-w-xl">
              {heading}
            </h1>
          )}
          {subHeading && (
            <p className="text-white text-sm sm:text-base md:text-lg max-w-lg">
              {subHeading.slice(0, 130)}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="bg-transparent border-2 border-head text-white tracking-wide hover:border-first hover:bg-first transition-all duration-500 ease-in-out">
              View More
            </Button>
            <Button className="bg-transparent border-2 border-white hover:bg-first hover:border-first text-white tracking-wide transition-all duration-500 ease-in-out">
              Shop Now
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BgFixed;
