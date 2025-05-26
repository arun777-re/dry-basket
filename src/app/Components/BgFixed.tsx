"use client";
import React from "react";

import Button from "../_components/Button";

interface BgFixedProps {
  title?: string;
  heading?: string;
  subHeading?: string;
  image?:string;
}

const BgFixed: React.FC<BgFixedProps> = ({
  title,
  heading,
  subHeading,
  image,
}) => {
  return (
<section
  style={{
    backgroundImage: `url(${image ?? '/images/banner-1.jpg'})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}
  className="max-w-screen w-full max-h-screen h-[450px] relative overflow-x-hidden"
>
  <div className="absolute h-full w-full top-0 left-0 z-10 bg-black/30 flex overflow-hidden">
    <article className="w-[50%] h-full relative flex flex-col py-16 px-12 gap-6">
      <p className="text-white text-base">{title}</p>
      <h1 className="text-first max-w-md">{heading}</h1>
      <p className="text-white text-base">{subHeading?.slice(0,130)}</p>
      <div className="flex items-center">
        <div className="relative flex w-full gap-8 pt-6">
          <Button className="bg-transparent drop-shadow-black/30 drop-shadow-xl border-2 border-head text-white tracking-wide hover:border-first hover:bg-first hover:drop-shadow-xl hover:drop-shadow-black/30 transition-all duration-500 ease-in-out">
            View More
          </Button>
          <Button className="bg-transparent border-2 border-white hover:bg-first hover:border-first text-white tracking-wide hover:drop-shadow-xl hover:drop-shadow-black/30 transition-all duration-500 ease-in-out">
            Shop Now
          </Button>
        </div>
      </div>
    </article>
  </div>
</section>

  );
};

export default BgFixed;
