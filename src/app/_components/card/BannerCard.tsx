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
    <Card className="w-full relative h-[70vh] md:h-[90vh] lg:h-[100vh] overflow-hidden border-none">
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage || "/images/bg-1.jpg"}
          alt={title || "banner"}
          fill
          priority={isFirst}            // 👈 LCP optimization
          loading={isFirst ? "eager" : "lazy"}
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <article className="flex flex-col items-center text-center gap-2 sm:gap-4">
          <h2 className="text-[var(--color-head)] drop-shadow-xl">{title}</h2>

          {description && (
            <p className="text-[var(--color-head)]/90 text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide">
              {description}
            </p>
          )}

          {couponValue && (
            <span className="text-[var(--color-first)] text-sm sm:text-base md:text-lg lg:text-xl tracking-wide bg-[var(--color-head)]/10 px-4 py-1 rounded-lg border border-[var(--color-border)]">
              Use Coupon: <strong>{couponValue}</strong>
            </span>
          )}
        </article>
      </div>
    </Card>
  );
};

export default BannerCard;
