'use client'
import Image from "next/image";
import React from "react";

interface Props {
  active: boolean;
  images: string[];
}

const ProductCardImage: React.FC<Props> = ({ active, images }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Default Image */}
      <Image
        src={images[0] ?? "/images/banner-1.jpg"}
        fill
        alt="product-image"
        priority
        className={`object-fill object-center transition-all duration-500 ease-in-out rounded-lg ${
          active ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      />

      {/* Active Image */}
      <Image
        src={images[1] ?? images[0] ?? "/images/banner-1.jpg"}
        fill
        alt="product-image-active"
        priority
        className={`absolute top-0 left-0 object-fill object-center transition-all duration-500  ease-in-out rounded-lg ${
          active ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
      />
    </div>
  );
};

export default ProductCardImage;
