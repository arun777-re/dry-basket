"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { motion } from "framer-motion";
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
  // redirect to complete blog
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/blog/${slug}`);
  };

  return (
    <motion.div
      className="relative w-full h-auto lg:h-60"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Card className="relative w-full h-full">
        <div className="w-full h-full flex items-center flex-col lg:flex-row gap-6 justify-center relative">
          <div className="relative h-full w-full lg:w-[40%] z-20">
            <div className="w-full h-60 lg:h-full relative ">
              <Image
                src={blogImage || "/images/card1.jpg"}
                alt={title || "blog-photo"}
                fill
                priority
                className="object-center object-fill"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/10"></div>
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/30"
              variants={{
                rest: { opacity: 0, borderRadius: "40px" },
                hover: {
                  opacity: 1,
                  borderRadius: "0px",
                  transition: {
                    opacity: { duration: 0.3, ease: "easeInOut" },
                    borderRadius: {
                      delay: 0.3,
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  },
                },
              }}
            />
          </div>
          <div className="relative h-full w-full lg:w-[60%] flex flex-col items-start justify-center gap-4">
            <h5 className="mb-0 hover:text-first cursor-pointer">{title.slice(0,60)}</h5>
            <div className="relative flex items-center justify-between w-full sm:w-[60%]">
              <article className="flex gap-1 items-center">
                <FaRegUserCircle size={20} className="text-head" />
                <p className="text-base">By&nbsp;{authorName}</p>
              </article>
              <div className="h-4 w-[1px] bg-body"></div>
              <article className="flex gap-1 items-center">
                <SlCalender size={20} className="text-head" />
                <p className="text-base">
                  {new Date(createdAt).toLocaleDateString() ??
                    "November 13,2018"}{" "}
                </p>
              </article>
            </div>
            <p className="text-sm">{description?.slice(0, 150)}...</p>
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
