
'use client'
import React from 'react'
import { FaStar } from 'react-icons/fa'
import BlogCard from '../_components/card/BlogCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { BlogsIncomingDTO } from '@/types/blog'
import useBlogHook from '@/hooks/blogHook'
import { PaginationQuery } from '@/types/response'
import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType } from "embla-carousel";

const Blog = () => {


    // here actual blogdata comes from backend
const [blogData,setBlogData] = React.useState<BlogsIncomingDTO[]>();
const {GET_ALL_BLOG} = useBlogHook();

const query:PaginationQuery = {
page:1,
limit:10
}
React.useEffect(()=>{
   let isMounted = true;
   (async()=>{
  await GET_ALL_BLOG(query).then((res)=>{
  res && setBlogData(res);
  });
   })();
   return ()=>{
    isMounted = false;
   }
},[]);

  // autoplay configuration of banner
  const autoplay = React.useMemo(
    () =>
      Autoplay({
        stopOnInteraction: false,
        delay: 5000,
        stopOnMouseEnter: true,
      }),
    []
  );

  // options for carousel
  const opts: Partial<EmblaOptionsType> = {
    align: "start" as const,
    containScroll: "trimSnaps" as const,
  };
  return (
    <section className='max-w-screen w-full h-auto relative'>
        <div className="relative w-full px-4 md:px-20 lg:px-30 flex flex-col items-center justify-center gap-10 pt-10 pb-10 sm:py-16 md:py-20">
  <header className="relative w-full sm:max-w-md  flex flex-col items-center justify-center ">
          <h2>Blog Post</h2>
          <p className='text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <div className="flex gap-2 items-center p-2">
            <FaStar size={18} className="text-first " />
            <FaStar size={25} className="text-body" />
            <FaStar size={18} className="text-first " />
          </div>
        </header>
        <section className="w-full relative ">
            <Carousel className='w-full' opts={opts} plugins={[autoplay]}>
                <CarouselContent>
                    {blogData && blogData.length > 0 && blogData.map((item,index)=>{
                        return (
                            <CarouselItem key={index} className='basis-full'>
                             <BlogCard {...item}/>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious  className='cursor-pointer border-2 border-head hidden sm:flex'/>
                <CarouselNext  className='cursor-pointer border-2 border-head hidden sm:flex'/>
            </Carousel>
        </section>
        </div>
    </section>
  )
}

export default Blog