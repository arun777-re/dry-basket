"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BlogsIncomingDTO } from "@/types/blog";

const BlogCard: React.FC<BlogsIncomingDTO> = ({
  slug,
  authorName,
  description,
  createdAt,
  title,
  blogImage,
}) => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => router.push(`/blog/${slug}`);

  // Slice text only if needed
  const displayTitle = title.length > 60 ? title.slice(0, 60) + "..." : title;
  const displayDescription =
    description && description.length > 150 ? description.slice(0, 150) + "..." : description;

  return (
    <motion.div
      className="relative w-full h-auto lg:h-60"
      initial="rest"
      whileHover={!shouldReduceMotion ? "hover" : "rest"}
      animate="rest"
    >
      <Card className="relative w-full h-full">
        <div className="w-full h-full flex items-center flex-col lg:flex-row gap-6 justify-center relative">
          {/* Image Section */}
          <div className="relative h-full w-full lg:w-[40%] z-20">
            <div className="w-full h-60 lg:h-full relative">
              <Image
                src={blogImage || "/images/card1.jpg"}
                alt={`Blog cover image for ${title}`}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-fill object-center "
              />
            </div>

            {/* Single overlay for hover */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-black/10"
              variants={{
                rest: { opacity: 0 },
                hover: {
                  opacity: 0.3,
                  transition: { duration: 0.3, ease: "easeInOut" },
                },
              }}
            />
          </div>

          {/* Text Section */}
          <div className="relative h-full w-full lg:w-[60%] flex flex-col items-start justify-center gap-4">
            <h5 className="mb-0 hover:text-first cursor-pointer">{displayTitle}</h5>

            <div className="relative flex items-center justify-between w-full sm:w-[60%]">
              <article className="flex gap-1 items-center">
                <FaRegUserCircle size={20} className="text-head" />
                <p className="text-base">By&nbsp;{authorName}</p>
              </article>

              <div className="h-4 w-[1px] bg-body"></div>

              <article className="flex gap-1 items-center">
                <SlCalender size={20} className="text-head" />
                <p className="text-base">
                  {new Date(createdAt).toLocaleDateString() ?? "November 13, 2018"}
                </p>
              </article>
            </div>

            <p className="text-sm">{displayDescription}</p>

            <Button
              onClick={handleClick}
              className="bg-white border-2 border-head rounded-full px-7 py-6
                text-body tracking-wide hover:border-first hover:bg-first hover:drop-shadow-xs
                hover:drop-shadow-black/30 transition-all duration-500 ease-in-out cursor-pointer"
            >
              Read More
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
