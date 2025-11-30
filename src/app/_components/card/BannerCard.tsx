"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@radix-ui/themes";
import { BannerIncomingDTO } from "@/types/banner";

interface BannerCardProps extends BannerIncomingDTO {
  isFirst?: boolean;
}

const BannerCard: React.FC<BannerCardProps> = ({
  bannerImage,
  title,
  description,
  couponValue,
  isFirst = false,
}) => {
  return (
    <div className="w-full relative h-[70vh] md:h-[90vh] lg:h-[100vh] overflow-hidden border-none">
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage || "/images/bg-1.jpg"}
          alt={title || "banner"}
          fill
          priority={isFirst}       
          loading={isFirst ? "eager" : "lazy"}
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <article className="relative flex flex-col items-center text-center gap-2 sm:gap-4 top-56">
          <h2 className="text-first/76 drop-shadow-xl">{title}</h2>

          {description && (
            <p className="text-first/76 text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide">
              {description}
            </p>
          )}

          {couponValue && (
            <span className="text-first text-sm sm:text-base md:text-lg lg:text-xl tracking-wide bg-[var(--color-head)]/10 px-4 py-1 rounded-lg border border-[var(--color-border)]">
              Use Coupon: <strong>{couponValue}</strong>
            </span>
          )}
        </article>
      </div>
    </div>
  );
};

export default BannerCard;
