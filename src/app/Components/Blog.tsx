import React from 'react'
import { FaStar } from 'react-icons/fa'
import BlogCard from '../_components/card/BlogCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

const Blog = () => {

    // here actual blogdata comes from backend
    const blogData = [
        {
        _id: 1,
        slug:"kashmiri-almonds-5678",
        title: "Kashmiri Almonds",
        image: "/images/card1-1.jpg",
        author:"Bharat",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo obcaecati commodi architecto quidem non sunt consequatur, excepturi quasi sit maiores eveniet repellendus laborum iusto magni voluptates porro itaque adipisci a.",
        createdAt:"November 13,2016"
        },
        {
        _id: 2,
        slug:"a2-desi-ghee-5679",
        title: "A2 Deshi Ghee",
        image: "/images/card2-1.jpg",
        author:"Bharat",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo obcaecati commodi architecto quidem non sunt consequatur, excepturi quasi sit maiores eveniet repellendus laborum iusto magni voluptates porro itaque adipisci a.",
        createdAt:"November 13,2016"
        },
        {
        _id: 3,
        slug:"afgan-cashew-5680",
        title: "Afgan Cashew",
        image: "/images/card3-1.jpg",
        author:"Bharat",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo obcaecati commodi architecto quidem non sunt consequatur, excepturi quasi sit maiores eveniet repellendus laborum iusto magni voluptates porro itaque adipisci a.",
        createdAt:"November 13,2016"
        },
    ]

  return (
    <section className='max-w-screen w-full h-auto '>
        <div className="relative w-full px-30 flex flex-col items-center justify-center gap-10 py-20">
  <header className="relative max-w-md w-full flex flex-col items-center justify-center ">
          <h2>Blog Post</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <div className="flex gap-2 items-center p-2">
            <FaStar size={18} className="text-first " />
            <FaStar size={25} className="text-body" />
            <FaStar size={18} className="text-first " />
          </div>
        </header>

        <section className="w-full relative ">
            <Carousel>
                <CarouselContent>
                    {blogData && blogData.length > 0 && blogData.map((item,index)=>{
                        return (
                            <CarouselItem key={index} className='basis-full'>
                             <BlogCard {...item}/>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </section>
        </div>
    </section>
  )
}

export default Blog