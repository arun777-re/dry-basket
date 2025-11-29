"use client";

import Banner from "@/app/Components/Banner";
import Navbar from "@/app/Components/Navbar";
import Image from "next/image";
import Head from "next/head";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { SlCalender } from "react-icons/sl";
import { LiaComments } from "react-icons/lia";
import { FaRegUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import useBlogHook from "@/hooks/blogHook";

// Lazy load Footer for performance
const Footer = dynamic(() => import("@/app/Components/Footer"), { ssr: false });

const CompleteBlog = () => {
  const slug = useParams();
  const safeSlug = slug?.slug as string;
  const { GET_SINGLE_BLOG, loading, singleBlog } = useBlogHook();

  React.useEffect(() => {
    (async () => {
      await GET_SINGLE_BLOG(safeSlug);
    })();
  }, [safeSlug]);

  // Collapsed content for long descriptions
  const maxLength = 600;
  const [showFull, setShowFull] = React.useState(false);
  const descriptionToShow =
    singleBlog.data?.description && !showFull
      ? singleBlog.data.description.slice(0, maxLength) + (singleBlog.data.description.length > maxLength ? "..." : "")
      : singleBlog.data?.description;

  return (
    <div className="w-full h-auto mx-auto relative">
      {/* Head meta tags */}
      <Head>
        <title>{singleBlog.data?.heading ? `${singleBlog.data.heading} | Blog - YourSiteName` : "Loading Blog... | YourSiteName"}</title>
        <meta
          name="description"
          content={
            singleBlog.data?.description?.slice(0, 160) ||
            "Read insightful blogs about dry fruits, spices, and healthy living."
          }
        />
        <meta
          name="keywords"
          content={`blog, ${singleBlog.data?.heading || "dry fruits"}, ${singleBlog.data?.authorName || "admin"}, health tips`}
        />
        <link rel="canonical" href={`https://yourwebsite.com/blog/${safeSlug}`} />
        <meta property="og:title" content={singleBlog.data?.heading || "Blog"} />
        <meta
          property="og:description"
          content={singleBlog.data?.description?.slice(0, 160) || "Read our latest blogs and updates."}
        />
        <meta
          property="og:image"
          content={singleBlog.data?.blogImage || "https://yourwebsite.com/default-blog-image.jpg"}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yourwebsite.com/blog/${safeSlug}`} />
      </Head>

      <Navbar />
      <Banner heading="Blog" />

      <section className="w-full h-auto relative">
        <div className="w-full relative px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52 py-10 md:py-20">
          {/* Blog Banner Image */}
          {loading ? (
            <div className="w-full h-[60vh] bg-gray-200 animate-pulse rounded-xl" />
          ) : (
            <div className="w-full relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
              <Image
                src={singleBlog.data?.blogImage || "/images/blog-1.jpg"}
                alt={singleBlog.data?.heading || "blog-photo"}
                fill
                priority
                className="object-fill object-center rounded-xl"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/10 rounded-xl" />
            </div>
          )}

          {/* Blog Content */}
          <article className="w-full h-auto relative pt-6 flex flex-col items-start">
            {loading ? (
              <div className="space-y-3">
                <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded" />
                <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded" />
                <div className="w-full h-40 bg-gray-200 animate-pulse rounded" />
              </div>
            ) : (
              <>
                <h4 className="text-head font-normal">{singleBlog.data?.heading}</h4>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 pt-3 text-sm">
                  <article className="flex gap-1 items-center">
                    <SlCalender size={14} className="text-head" />
                    <p className="text-text/90">
                      {singleBlog.data && new Date(singleBlog.data.createdAt).toLocaleDateString()}
                    </p>
                  </article>
                  <article className="flex gap-1 items-center">
                    <LiaComments size={18} className="text-head" />
                    <p className="text-text/90">6 Comments</p>
                  </article>
                  <article className="flex gap-1 items-center">
                    <FaRegUserCircle size={16} className="text-head" />
                    <p className="text-text/90">{singleBlog.data?.authorName}</p>
                  </article>
                </div>

                {/* Body */}
                <p className="text-body text-sm sm:text-base font-normal tracking-wide font-rice py-3">
                  {singleBlog.data?.title}
                </p>
                <p className="leading-relaxed">
                  {descriptionToShow}
                  {singleBlog.data?.description!?.length > maxLength && (
                    <button
                      className="ml-2 text-first underline"
                      onClick={() => setShowFull(!showFull)}
                    >
                      {showFull ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>
              </>
            )}
          </article>
        </div>
      </section>

      <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default CompleteBlog;
