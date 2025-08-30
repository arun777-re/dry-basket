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
    >
      <Card className="h-90 w-[19vw] relative border border-amber-400">
        <div className="w-full h-full relative flex flex-col items-center justify-center gap-6">
          <div className="relative w-full h-[45%]">
            <Image
              src={image ?? "/images/banner-4.jpg"} 
              alt={altText ?? `Image for ${category}` ?? "product"}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          <article className="w-full relative h-[55%] flex flex-col items-center gap-4 px-2">
            <h5 className="mb-0">{category}</h5>
            <p className="text-center">{description}</p>
            <Button
              onClick={() => router.push(`/products/${category}`)}
              className="bg-transparent border-2 border-head rounded-full px-7 py-6
            text-body tracking-wide hover:border-first hover:bg-first transition-all duration-500 ease-in-out cursor-pointer"
            >
              View More
            </Button>
          </article>
        </div>
      </Card>
    </motion.div>
  );
};

export default PremiumCard;
