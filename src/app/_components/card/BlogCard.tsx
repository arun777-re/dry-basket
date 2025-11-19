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

  const displayTitle = title.length > 60 ? title.slice(0, 60) + "..." : title;
  const displayDescription =
    description && description.length > 150
      ? description.slice(0, 150) + "..."
      : description;

  return (
    <motion.div
      className="relative w-full h-auto lg:h-60"
      initial="rest"
      whileHover={!shouldReduceMotion ? "hover" : "rest"}
      animate="rest"
    >
      <Card
        className="
          relative w-full h-full 
          
          rounded-lg 
          text-white shadow-sm
        "
      >
        <div className="w-full h-full flex flex-col lg:flex-row items-center gap-6 relative">

          {/* Image Section */}
          <div className="relative h-full w-full lg:w-[40%] z-20">
            <div className="w-full h-60 lg:h-full relative rounded-md overflow-hidden border-2 border-border ">
              <Image
                src={blogImage || "/images/card1.jpg"}
                alt={`Blog cover image for ${title}`}
                fill
                loading="lazy"
                sizes="100%"
                className="object-cover"
              />
            </div>

            {/* Hover Overlay */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-black/20"
              variants={{
                rest: { opacity: 0 },
                hover: {
                  opacity: 0.25,
                  transition: { duration: 0.3, ease: "easeInOut" },
                },
              }}
            />
          </div>

          {/* Text Section */}
          <div className="relative h-full w-full lg:w-[60%] flex flex-col items-start justify-center gap-4 bg-body px-4 rounded-lg border-2
          border-border">

            <h5 className="mb-0 text-head hover:text-first transition-all cursor-pointer">
              {displayTitle}
            </h5>

            <div className="relative flex items-center justify-between w-full sm:w-[60%]">

              {/* Author */}
              <article className="flex gap-1 items-center">
                <FaRegUserCircle size={20} className="text-head" />
                <p className="text-base text-head">By&nbsp;{authorName}</p>
              </article>

              <div className="h-4 w-[1px] bg-border"></div>

              {/* Date */}
              <article className="flex gap-1 items-center">
                <SlCalender size={20} className="text-head" />
                <p className="text-base text-head">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              </article>
            </div>

            <p className="text-sm text-white/80">{displayDescription}</p>

            <Button
              onClick={handleClick}
              className="
                bg-transparent 
                border-2 border-head 
                rounded-full px-7 py-6
                text-head tracking-wide
                hover:border-first hover:bg-first hover:text-body
                transition-all duration-500 ease-in-out cursor-pointer
              "
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
