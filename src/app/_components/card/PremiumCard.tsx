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
      className="w-full max-w-[320px]"
    >
      <Card className="relative flex flex-col h-full border border-border shadow-sm">

        {/* Image */}
        <div className="relative w-full h-36 sm:h-44 md:h-48">
          <Image
            src={image ?? "/images/banner-4.jpg"}
            alt={altText ?? "premium-image"}
            fill
            loading="lazy"
            className="object-fill object-center"
          />
        </div>

        {/* Content */}
        <article className="w-full flex flex-col items-center gap-2 p-4 text-center">
          <h5 className="mb-0 font-semibold text-first">{category}</h5>

          <p className="line-clamp-3 ">{description}</p>

          <Button
            onClick={() => router.push(`/products/${category}`)}
            className="
              bg-transparent border-2 border-first
              rounded-full px-5 py-3 text-first tracking-wide
              hover:border-first hover:bg-first hover:text-white 
              transition-all duration-500 ease-in-out cursor-pointer
            "
          >
            View More
          </Button>
        </article>
      </Card>
    </motion.div>
  );
};

export default PremiumCard;
