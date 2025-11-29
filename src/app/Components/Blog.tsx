"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import BlogCard from "../_components/card/BlogCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogsIncomingDTO } from "@/types/blog";
import useBlogHook from "@/hooks/blogHook";
import { PaginationQuery } from "@/types/response";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import Spinner from "../_components/Spinner";

const Blog = () => {
  const { GET_ALL_BLOG, loading, blogs } = useBlogHook();

  const query: PaginationQuery = { page: 1, limit: 10 };

  const isMounted = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    (async () => {
      await GET_ALL_BLOG(query);
    })();

    return () => {
      isMounted.current = false;
    };
  }, []);

  // Autoplay
  const autoplay = React.useMemo(
    () =>
      Autoplay({
        stopOnInteraction: false,
        delay: 5000,
        stopOnMouseEnter: true,
      }),
    []
  );

  const opts: Partial<EmblaOptionsType> = {
    align: "start",
    containScroll: "trimSnaps",
  };

  if (loading) {
    return (
      <div className="w-screen flex flex-col items-center justify-center gap-4 py-20">
        <h5 className="text-head">Loading...</h5>
        <Spinner />
      </div>
    );
  }

  if (blogs.data.length === 0) {
    return (
      <div className="w-screen flex flex-col items-center justify-center gap-4 py-20">
        <h5 className="text-head">No Blogs to show</h5>
        <Spinner />
      </div>
    );
  }

  return (
    <section className="max-w-screen w-full h-auto relative bg-white">
      <div className="relative w-full px-4 md:px-20 lg:px-30 flex flex-col items-center justify-center gap-10 pt-10 pb-10 sm:py-16 md:py-20">
        {/* Header */}
        <header className="relative w-full sm:max-w-md flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-semibold text-head">Blog Post</h2>
          <p className="text-text mt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </header>

        {/* Blog Slider */}
        <section className="w-full relative">
          <Carousel className="w-full" opts={opts} plugins={[autoplay]}>
            <CarouselContent>
              {blogs.data.map((item: BlogsIncomingDTO, index: number) => (
                <CarouselItem key={index} className="basis-full">
                  <BlogCard {...item} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <CarouselPrevious
              aria-label="Previous blog"
              className="cursor-pointer border-2 border-head text-head hidden sm:flex hover:border-first hover:text-first transition-all"
            />
            <CarouselNext
              aria-label="Next blog"
              className="cursor-pointer border-2 border-head text-head hidden sm:flex hover:border-first hover:text-first transition-all"
            />
          </Carousel>
        </section>
      </div>
    </section>
  );
};

export default Blog;
