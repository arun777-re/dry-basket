'use client'
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
  // here vactual complete blog comes from backend using slug
  const slug = useParams();
const safeSlug = slug?.slug as string;
const [blog,setBlog] = React.useState<BlogsIncomingDTO>();
  const {GET_SINGLE_BLOG} = useBlogHook()
  React.useEffect(()=>{
    let isMounted = true;
    (async()=>{
        await GET_SINGLE_BLOG(safeSlug).then((res)=>{
            res && setBlog(res);
        });
    })();
    return ()=>{
        isMounted = false;
    }
  },[slug])
  return (
    <div className="max-w-screen w-full h-auto mx-auto relative">
      <Navbar />
      <Banner />
      <section className="w-full h-auto relative">
        <div className="w-full relative px-52 py-20">
          <div className="w-full relative h-[70vh]">
            <Image
              src={blog?.blogImage || "/images/blog-1.jpg"}
              alt="bolg-photo"
              fill
              priority
              className="object-fill object-center"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
          </div>
          <article className="w-full h-auto relative pt-6 flex flex-col items-start">
            <h4 className="text-body ">{blog && blog?.heading}</h4>
            <div className="flex flex-row items-center justify-center pt-1 gap-2 ">
              {[
                {
                  icon: <SlCalender size={14} className="text-head" />,
                  text:blog && new Date(blog?.createdAt).toLocaleDateString(),
                },
                {
                  icon: <LiaComments size={18} className="text-head" />,
                  text: "6 Comments",
                },
                {
                  icon: <FaRegUserCircle size={16} className="text-head" />,
                  text: `${blog?.authorName}`,
                },
              ].map((item, index) => {
                return (
                  <article className="flex gap-1 items-center" key={index}>
                    {item?.icon}
                    <p>{item?.text}</p>
                  </article>
                );
              })}
            </div>
            <p className="text-black text-base font-medium font-cursive py-3">
              {blog && blog?.description}
            </p>
            <p className="leading-relaxed">
             {blog?.description}
            </p>
            <p className="py-6 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
              voluptatem aperiam nulla tempora omnis culpa perspiciatis, natus,
              architecto magnam libero, neque voluptatum quaerat est accusantium
              reprehenderit vel dolores nam temporibus blanditiis aliquam.
              Accusamus dolorum doloribus facilis nisi cupiditate soluta
              quaerat.
            </p>
            <p className="pb-6 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet
              voluptatem aperiam nulla tempora omnis culpa perspiciatis, natus,
              architecto magnam libero, neque voluptatum quaerat est accusantium
              reprehenderit vel dolores nam temporibus blanditiis aliquam.
              Accusamus dolorum doloribus facilis nisi cupiditate soluta
              quaerat.
            </p>
          </article>
          <div className="max-w-lg w-full relative flex gap-2 items-center pb-8">
            <p className="text-head text-base font-semibold font-rice">
              Share with us&nbsp;:
            </p>
            <FaFacebook size={16} />
            <FaTwitter size={16} />
            <FaInstagram size={16} />
            <FaGoogle size={16} />
          </div>
          <Button className="w-full py-2 border rounded-none border-gray-100 hover:bg-first cursor-pointer transition-all duration-500 ease-in-out">
            <span className="text-base text-center">Older Post</span>
          </Button>
          <div className="w-full h-auto relative pt-6">
            <div className="px-8 py-6 w-full relative flex flex-col items-start justify-center gap-8 bg-gray-100">
              <article className="flex gap-2 items-center">
                <LiaComments size={20} className="text-head" />
                <h4 className="text-head mb-0">6 Comments</h4>
              </article>
              {/* here actual comments comes associated with a blog from backend */}
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
              ].map((value, key) => {
                return (
                  <div className="relative w-full flex items-center gap-2">
                    <p>{key}.</p>
                    <article className="w-full h-auto relative flex flex-col items-start px-5 py-6 bg-white">
                      <div className="flex relative items-center w-full gap-2">
                        {[
                          {
                            icon: (
                              <SlCalender size={14} className="text-head" />
                            ),
                            text: value?.createdAt,
                          },
                          {
                            icon: (
                              <FaRegUserCircle
                                size={16}
                                className="text-head"
                              />
                            ),
                            text: value?.createdBy,
                          },
                        ].map((item, index) => {
                          return (
                            <article
                              className="flex flex-row gap-1 items-center"
                              key={index}
                            >
                              {item?.icon}
                              <p>{item?.text}</p>
                            </article>
                          );
                        })}
                      </div>

                      <div className="w-full h-[1px] bg-gray-100 my-4"></div>
                      <p>{value?.comment}</p>
                    </article>
                  </div>
                );
              })}
              {/* here pagination comes */}
              <div className="flex gap-1 w-full">
                <p>pagination buttons</p>
              </div>
              <div className="flex flex-col items-start gap-8 relative w-full">
                <h4 className="text-head mb-0">Leave a comment</h4>
                <form
                  action=""
                  method="post"
                  className="w-full relative grid  gap-6"
                >
                  <div className="grid grid-cols-2 gap-6 relative w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-3  outline-1
                transition-all duration-300 ease-in-out rounded-full focus:outline-head bg-white placeholder:text-body placeholder:text-start placeholder:text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      className="w-full px-4 py-3 outline-1
                transition-all duration-300 ease-in-out rounded-full focus:outline-head bg-white placeholder:text-body placeholder:text-start placeholder:text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-white outline-1
                transition-all duration-300 ease-in-out focus:outline-head placeholder:text-body placeholder:text-start placeholder:text-sm h-[20vh] rounded-2xl px-8"
                    placeholder="Message"
                  />
                  <div className="w-full relative flex items-end justify-end">
                    <Button
                      type="submit"
                      className=" border-2 border-head hover:border-first hover:bg-first transition-all duration-500 ease-in-out"
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
