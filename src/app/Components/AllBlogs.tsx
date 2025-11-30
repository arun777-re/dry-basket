import React from 'react';
import BlogsCard from '../_components/card/BlogsCard';
import { BlogsIncomingDTO } from '@/types/blog';
import { premiumProductData } from '@/data/premiumProduct';
import PremiumCard from '../_components/card/PremiumCard';
import Pagination from '../_components/Pagination';
import { PaginatedProductResponse } from '@/types/response';

const AllBlogs = ({page,data}:{page:number,data:PaginatedProductResponse<BlogsIncomingDTO>}) => {

  // handle no blogs case
  if (!data || !Array.isArray(data.data)){
    return <div className="text-center py-20 text-gray-500">No Blogs Available</div>;
  }

  // pagination logic
  const hasNextPage = !!(data && data.hasNextPage);
  const hasPrevPage = !!(data && data.hasPrevPage);

  // filter valid blogs
  const validBlogs:BlogsIncomingDTO[] = 
    
      Array.isArray(data.data) ?
      data.data.filter((i: BlogsIncomingDTO) => i.slug && i.slug.trim() !== "") :
    [];

  return (
    <section className="w-[100vw] relative min-h-screen bg-body py-10 ">
      <div className="relative flex flex-col md:flex-row items-start justify-between gap-8 px-4 md:px-10 lg:px-20 ">
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center w-full h-auto md:w-[70%] relative">
          <div className="w-[100%] h-full relative flex items-center justify-center flex-col md:flex-row gap-4">
           {validBlogs.length > 0 ? (
            validBlogs.map((blog: BlogsIncomingDTO) => (
              <BlogsCard key={blog.slug} {...blog} />
            ))
          ) : (
            <h2 className="text-center text-lg text-gray-500">No Blogs to show</h2>
          )}
          </div>

          {/* Pagination */}
          <div className="pt-6">
            <Pagination
              page={page}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
            />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full md:w-[26%] relative md:sticky md:top-24 space-y-6 flex flex-col items-center justify-start bg-[#1f6f6f10]">
          {premiumProductData.slice(0, 2).map((item) => (
            <PremiumCard
              key={item.category}
              category={item.category}
              description={item.description}
              image={item.image}
            />
          ))}
        </aside>
      </div>
    </section>
  );
};

export default AllBlogs;
