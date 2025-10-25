
'use client';

import React from 'react';
import useBlogHook from '@/hooks/blogHook';
import BlogsCard from '../_components/card/BlogsCard';
import { BlogsIncomingDTO } from '@/types/blog';
import { premiumProductData } from '@/data/premiumProduct';
import PremiumCard from '../_components/card/PremiumCard';
import Pagination from '../_components/Pagination';


const AllBlogs = () => {
    const [page,setPage] = React.useState<number>(1);
    const limit = 10;

    // blog hook
    const {blogs,GET_ALL_BLOG} = useBlogHook();

    // fetch all blogs
    React.useEffect(()=>{
       (async()=>{
        await GET_ALL_BLOG({page:page,limit:limit})
       })();
    },[page,GET_ALL_BLOG]);


    // handle no blogs case
if(!blogs || !Array.isArray(blogs.data)){
    return <div>No Blogs Available</div>
}

// pagination logic
  const hasNextPage = !!(blogs && blogs.hasNextPage);
  const hasPrevPage = !!(blogs && blogs.hasPrevPage);

  // filter valid blogs to avoid rendering issues or runtime errors
const validBlogs = (blogs && Array.isArray(blogs.data) && blogs.data.filter((i:BlogsIncomingDTO) => i.slug !== "")) ?? [];

  return (
    <section className='max-w-screen w-full relative min-h-screen h-auto mx-auto '>
<div className="py-10 sm:py-16 px-4 sm:px-10 md:px-20 w-full h-full relative flex flex-col-reverse md:flex-row items-start md:items-center justify-center gap-8">
  {/* Sidebar / Aside */}
  <aside className="w-full md:w-1/3 flex flex-row md:flex-col items-start justify-start gap-6">
   {
    premiumProductData.slice(0,2).map((item)=>(
      <PremiumCard key={item.category} category={item.category} description={item.description} image={item.image}/>
    ))
   }
  </aside>

  {/* Main Content */}
  <main className="w-full md:w-[70%] flex flex-row flex-wrap items-center justify-start gap-6">
    {validBlogs.length > 0 ? (
      validBlogs.map((blog: BlogsIncomingDTO) => (
        <BlogsCard key={blog.slug} {...blog} />
      ))
    ) : (
      <h2 className="text-center text-lg text-gray-500">No Blogs to show</h2>
    )}
  <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} hasPrevPage={hasPrevPage}/>

  </main>
</div>

    </section>
  )
}

export default AllBlogs