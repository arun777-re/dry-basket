"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { BlogsIncomingDTO } from "@/types/blog";

const BlogsCard: React.FC<BlogsIncomingDTO> = ({
  blogImage,
  description,
  title,
  tags,
  heading,
  authorName,
  slug,
}) => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative mx-auto w-full md:w-1/2"
    >
      <Card className="flex flex-col h-full rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-500">
        {/* Image */}
        <div className="relative w-full h-44 sm:h-48 md:h-56 lg:h-60">
          <Image
            src={blogImage ?? "/images/banner-4.jpg"}
            alt={title ?? "blog-image"}
            fill
            className="object-fill object-center"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/50 to-transparent p-2">
            <span className="text-xs sm:text-sm text-white font-medium">
              {tags && tags.join(", ")}
            </span>
          </div>
        </div>

        {/* Content */}
        <article className="flex flex-col items-start gap-2 p-4 sm:p-5 text-left">
          <h5 className="text-lg sm:text-xl font-normal text-gray-800 line-clamp-2">
            {title ?? ""}
          </h5>
          {heading && (
            <span className="text-sm sm:text-base font-normal text-gray-600 line-clamp-1">
              {heading}
            </span>
          )}
          <p className="text-sm sm:text-base text-gray-500 line-clamp-3">
            {description}
          </p>
          <div className="flex items-center justify-between w-full mt-3">
            <span className="text-xs sm:text-sm text-gray-400">By {authorName}</span>
            <Button
              onClick={() => router.push(`/blog/${slug}`)}
              className="bg-transparent border-2 border-primary rounded-full px-4 sm:px-5 py-2 sm:py-3
                text-primary font-medium tracking-wide hover:bg-primary hover:text-white transition-all duration-500 ease-in-out"
            >
              Read More
            </Button>
          </div>
        </article>
      </Card>
    </motion.div>
  );
};

export default BlogsCard;
