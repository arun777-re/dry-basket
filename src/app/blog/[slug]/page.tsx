"use client";

import Banner from "@/app/Components/Banner";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import Image from "next/image";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { LiaComments } from "react-icons/lia";
import { FaRegUserCircle } from "react-icons/fa";
import Button from "@/app/_components/Button";
import { useParams } from "next/navigation";
import useBlogHook from "@/hooks/blogHook";
import { BlogsIncomingDTO } from "@/types/blog";

const CompleteBlog = () => {
  const slug = useParams();
  const safeSlug = slug?.slug as string;
  const [blog, setBlog] = React.useState<BlogsIncomingDTO>();
  const { GET_SINGLE_BLOG } = useBlogHook();

  React.useEffect(() => {
    (async () => {
      const res = await GET_SINGLE_BLOG(safeSlug);
      res && setBlog(res);
    })();
  }, [safeSlug]);

  return (
    <div className="w-full h-auto mx-auto relative">
      <Navbar />
      <Banner heading="Blog"/>
      <section className="w-full h-auto relative">
        <div className="w-full relative px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-10 md:py-20">
          {/* Blog Banner Image */}
          <div className="w-full relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
            <Image
              src={blog?.blogImage || "/images/blog-1.jpg"}
              alt="blog-photo"
              fill
              priority
              className="object-fill object-center rounded-xl"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-xl" />
          </div>

          {/* Blog Content */}
          <article className="w-full h-auto relative pt-6 flex flex-col items-start">
            <h4 className="text-head font-normal">
              {blog?.heading}
            </h4>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-sm">
              {[
                {
                  icon: <SlCalender size={14} className="text-head" />,
                  text: blog && new Date(blog?.createdAt).toLocaleDateString(),
                },
                {
                  icon: <LiaComments size={18} className="text-head" />,
                  text: "6 Comments",
                },
                {
                  icon: <FaRegUserCircle size={16} className="text-head" />,
                  text: `${blog?.authorName}`,
                },
              ].map((item, index) => (
                <article className="flex gap-1 items-center" key={index}>
                  {item.icon}
                  <p className="text-body">{item.text}</p>
                </article>
              ))}
            </div>

            {/* Body */}
            <p className="text-body text-sm sm:text-base font-normal tracking-wide font-rice py-3">
              {blog?.title}
            </p>
            <p className="leading-relaxed">{blog?.description}</p>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CompleteBlog;
