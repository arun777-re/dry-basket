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
  className="relative w-full h-auto lg:h-64"
  initial="rest"
  whileHover={!shouldReduceMotion ? "hover" : "rest"}
  animate="rest"
>
  <Card
    className="
      relative w-full h-full overflow-hidden
      bg-[#0b0f12]/60 backdrop-blur-md
      border border-white/10 rounded-xl shadow-xl
      hover:border-first hover:shadow-first/20 transition-all
    "
  >
    <div className="w-full h-full flex flex-col lg:flex-row items-center gap-6 relative p-4">

      {/* Image Section */}
      <div className="relative h-56 lg:h-full w-full lg:w-[40%] rounded-lg overflow-hidden">
        <Image
          src={blogImage || '/images/card1.jpg'}
          alt={title}
          fill
          loading="lazy"
          sizes="100%"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <motion.div
          className="absolute inset-0 bg-black/30"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1, transition: { duration: 0.3 } },
          }}
        />
      </div>

      {/* Text */}
      <div className="h-full w-full lg:w-[60%] flex flex-col justify-center gap-4">
        <h5
          onClick={handleClick}
          className="mb-0 text-xl font-semibold text-white hover:text-first transition-all cursor-pointer"
        >
          {displayTitle}
        </h5>

        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <FaRegUserCircle className="text-first" />
            <span>{authorName}</span>
          </div>

          <span className="w-[1px] h-4 bg-gray-600"></span>

          <div className="flex items-center gap-2">
            <SlCalender className="text-first" />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <p className="text-gray-400 leading-relaxed text-sm">
          {displayDescription}
        </p>

        <Button
          onClick={handleClick}
          className="
            bg-first/20 border border-first text-first
            rounded-full px-8 py-5 tracking-wide font-medium
            hover:bg-first hover:text-white hover:shadow-first/40
            transition-all duration-300
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
