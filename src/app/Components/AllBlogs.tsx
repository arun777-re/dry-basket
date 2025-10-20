
'use client';

import React from 'react';
import useBlogHook from '@/hooks/blogHook';
import BlogsCard from '../_components/card/BlogsCard';
import { BlogsIncomingDTO } from '@/types/blog';


const AllBlogs = () => {
        const [page,setPage] = React.useState<number>(1);
    const limit = 10;

    const {blogs,GET_ALL_BLOG} = useBlogHook();

    React.useEffect(()=>{
       (async()=>{
        await GET_ALL_BLOG({page:page,limit:limit})
       })();
    },[page,GET_ALL_BLOG]);

    
if(!blogs || !Array.isArray(blogs.data)){
    return <div>No Blogs Available</div>
}
  return (
    <section className='max-w-screen w-full relative min-h-screen h-auto mx-auto '>
<div className="py-10 sm:py-16 px-4 sm:px-10 md:px-20 w-full h-full relative flex flex-col-reverse md:flex-row items-center justify-center gap-8">
    <aside className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        </aside>
        <main className="w-[70%] flex flex-col items-center justify-center gap-6">
{blogs && blogs.data && blogs.data.map((blog:BlogsIncomingDTO)=>(
   <BlogsCard key={blog.slug} {...blog}/>
))}
        </main>
</div>
    </section>
  )
}

export default AllBlogs