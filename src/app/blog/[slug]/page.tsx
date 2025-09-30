'use client';

import Banner from "@/app/Components/Banner";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import Image from "next/image";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { LiaComments } from "react-icons/lia";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaRegUserCircle,
  FaTwitter,
} from "react-icons/fa";
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
      <Banner />

      <section className="w-full h-auto relative">
        <div className="w-full relative px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-10 md:py-20">
          {/* Blog Banner Image */}
          <div className="w-full relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
            <Image
              src={blog?.blogImage || "/images/blog-1.jpg"}
              alt="blog-photo"
              fill
              priority
              className="object-cover object-center rounded-xl"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 rounded-xl" />
          </div>

          {/* Blog Content */}
          <article className="w-full h-auto relative pt-6 flex flex-col items-start">
            <h4 className="text-head text-2xl md:text-3xl font-semibold">
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
            <p className="text-body text-base font-medium font-cursive py-3">
              {blog?.description}
            </p>
            <p className="leading-relaxed">{blog?.description}</p>
            <p className="py-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              voluptatem aperiam nulla tempora omnis culpa perspiciatis, natus,
              architecto magnam libero...
            </p>
            <p className="pb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              voluptatem aperiam nulla tempora omnis culpa perspiciatis, natus...
            </p>
          </article>

          {/* Share */}
          <div className="max-w-lg w-full relative flex gap-3 items-center pb-8 mt-6">
            <p className="text-head text-base font-semibold font-rice">
              Share with us&nbsp;:
            </p>
            <FaFacebook size={16} className="cursor-pointer hover:text-head" />
            <FaTwitter size={16} className="cursor-pointer hover:text-head" />
            <FaInstagram size={16} className="cursor-pointer hover:text-head" />
            <FaGoogle size={16} className="cursor-pointer hover:text-head" />
          </div>

          <Button className="w-full py-2 border rounded-none border-gray-100 hover:bg-first cursor-pointer transition-all duration-500 ease-in-out">
            <span className="text-base text-center">Older Post</span>
          </Button>

          {/* Comments Section */}
          <div className="w-full h-auto relative pt-10">
            <div className="px-4 sm:px-6 py-6 w-full relative flex flex-col items-start justify-center gap-8 bg-gray-100 rounded-xl">
              <article className="flex gap-2 items-center">
                <LiaComments size={20} className="text-head" />
                <h4 className="text-head mb-0">6 Comments</h4>
              </article>

              {/* Comments */}
              {[
                {
                  createdAt: "March 6,2025",
                  createdBy: "Bharat",
                  comment:
                    "Best product and best services are found to this store",
                },
                {
                  createdAt: "March 10,2025",
                  createdBy: "Arun",
                  comment:
                    "Best product and best services are found to this store",
                },
                {
                  createdAt: "March 20,2025",
                  createdBy: "Katiya",
                  comment:
                    "Best product and best services are found to this store",
                },
              ].map((value, key) => (
                <div
                  className="relative w-full flex flex-col sm:flex-row items-start sm:items-center gap-3"
                  key={key}
                >
                  <p className="text-sm font-semibold text-body">{key + 1}.</p>
                  <article className="w-full h-auto relative flex flex-col items-start px-5 py-6 bg-white rounded-xl">
                    <div className="flex flex-wrap gap-4 w-full">
                      {[
                        {
                          icon: <SlCalender size={14} className="text-head" />,
                          text: value?.createdAt,
                        },
                        {
                          icon: (
                            <FaRegUserCircle size={16} className="text-head" />
                          ),
                          text: value?.createdBy,
                        },
                      ].map((item, index) => (
                        <article
                          className="flex flex-row gap-1 items-center"
                          key={index}
                        >
                          {item.icon}
                          <p className="text-body">{item.text}</p>
                        </article>
                      ))}
                    </div>

                    <div className="w-full h-[1px] bg-gray-100 my-4"></div>
                    <p className="text-body">{value?.comment}</p>
                  </article>
                </div>
              ))}

              {/* Pagination */}
              <div className="flex gap-2 w-full justify-center text-sm text-body">
                <p>Pagination buttons</p>
              </div>

              {/* Leave a Comment */}
              <div className="flex flex-col items-start gap-8 relative w-full">
                <h4 className="text-head mb-0 text-lg font-semibold">
                  Leave a comment
                </h4>
                <form
                  action=""
                  method="post"
                  className="w-full relative grid gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-3 outline-1 transition-all duration-300 ease-in-out rounded-full focus:outline-head bg-white placeholder:text-body placeholder:text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      className="w-full px-4 py-3 outline-1 transition-all duration-300 ease-in-out rounded-full focus:outline-head bg-white placeholder:text-body placeholder:text-sm"
                    />
                  </div>
                  <textarea
                    className="w-full bg-white outline-1 transition-all duration-300 ease-in-out focus:outline-head placeholder:text-body placeholder:text-sm h-[20vh] rounded-2xl px-4 py-3"
                    placeholder="Message"
                  />
                  <div className="w-full relative flex items-end justify-end">
                    <Button
                      type="submit"
                      className="border-2 border-head hover:border-first hover:bg-first transition-all duration-500 ease-in-out"
                    >
                      Post comment
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CompleteBlog;
