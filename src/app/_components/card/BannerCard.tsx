"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@radix-ui/themes";
import { BannerIncomingDTO } from "@/types/banner";

const BannerCard: React.FC<BannerIncomingDTO> = ({
  bannerImage,
  title,
  description,
  couponValue,
}) => {
  return (
    <Card className="w-full relative h-[70vh] md:h-[90vh] lg:h-[100vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage || "/images/bg-1.jpg"}
          alt="banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Overlay content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <article className="flex flex-col items-center text-center gap-2 sm:gap-4">
          <h2 className="text-white  sm:text-3xl md:text-4xl lg:text-6xl font-bold">
            {title}
          </h2>
          {description && (
            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide">
              {description}
            </p>
          )}
          {couponValue && (
            <span className="text-white text-sm sm:text-base md:text-lg lg:text-xl tracking-wide">
              Use Coupon: <strong>{couponValue}</strong>
            </span>
          )}
        </article>
      </div>
    </Card>
  );
};

export default BannerCard;
