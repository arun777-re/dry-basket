"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { PremiumProductDTO } from "@/types/product";

const PremiumCard: React.FC<PremiumProductDTO> = ({
  image,
  category,
  description,
  altText,
}) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full max-w-[320px]" // each card max width
    >
      <Card className="relative flex flex-col h-full">
        {/* image */}
        <div className="relative w-full h-48 sm:h-56 md:h-60">
          <Image
            src={image ?? "/images/banner-4.jpg"}
            alt={altText ?? "blog-image"}
            fill
            priority
            className="object-cover object-center rounded-t-xl"
          />
        </div>

        {/* content */}
        <article className="w-full flex flex-col items-center gap-3 px-4 py-4 text-center">
          <h5 className="mb-0 text-base md:text-lg font-semibold">{category}</h5>
          <p className="text-sm md:text-base line-clamp-3">{description}</p>
          <Button
            onClick={() => router.push(`/products/${category}`)}
            className="bg-transparent border-2 border-head rounded-full px-5 py-3
              text-body tracking-wide hover:border-first hover:bg-first transition-all duration-500 ease-in-out cursor-pointer"
          >
            View More
          </Button>
        </article>
      </Card>
    </motion.div>
  );
};

export default PremiumCard;
