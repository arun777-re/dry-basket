"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@radix-ui/themes";

interface BannerProps {
  _id: number;
  image: string;
  title: string;
  subheading?: string;
  coupan?: string;
}

const BannerCard: React.FC<BannerProps> = ({
  _id,
  image,
  title,
  subheading,
  coupan,
}) => {
  return (
    <Card className="w-full relative h-[106vh] top-0 left-0 overflow-hidden">
      <div className="w-full h-full relative z-0">
        <Image
          src={image}
          alt="banner"
          width={1400}
          height={800}
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="absolute h-full w-full top-0 left-0 z-10 bg-black/30 flex items-center justify-center">
        <article className="flex flex-col items-center justify-center gap-4 relative top-12.5">
          <h1>{title}</h1>
          <p className="text-4xl font-medium text-first tracking-wide">
            {subheading}
          </p>
          <span className="text-2xl text-first tracking-wide">
            USE COUPAN : {coupan}
          </span>
        </article>
      </div>
    </Card>
  );
};

export default BannerCard;
