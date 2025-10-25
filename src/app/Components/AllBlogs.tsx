'use client';

import React from 'react';
import useBlogHook from '@/hooks/blogHook';
import BlogsCard from '../_components/card/BlogsCard';
import { BlogsIncomingDTO } from '@/types/blog';
import { premiumProductData } from '@/data/premiumProduct';
import PremiumCard from '../_components/card/PremiumCard';
import Pagination from '../_components/Pagination';

const AllBlogs = () => {
  const [page, setPage] = React.useState<number>(1);
  const limit = 10;

  // blog hook
  const { blogs, GET_ALL_BLOG } = useBlogHook();

  // fetch all blogs
  React.useEffect(() => {
    (async () => {
      await GET_ALL_BLOG({ page: page, limit: limit });
    })();
  }, [page, GET_ALL_BLOG]);

  // handle no blogs case
  if (!blogs || !Array.isArray(blogs.data)) {
    return <div className="text-center py-20 text-gray-500">No Blogs Available</div>;
  }

  // pagination logic
  const hasNextPage = !!(blogs && blogs.hasNextPage);
  const hasPrevPage = !!(blogs && blogs.hasPrevPage);

  // filter valid blogs
  const validBlogs =
    (blogs &&
      Array.isArray(blogs.data) &&
      blogs.data.filter((i: BlogsIncomingDTO) => i.slug !== '')) ??
    [];

  return (
    <section className="w-full relative max-w-screen-xl mx-auto min-h-scree px-4 md:px-10 lg:px-20 py-10">
      <div className="relative flex flex-col md:flex-row items-start justify-between gap ">
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center w-full h-auto md:w-[70%]  ">
          <div className="w-full h-full relative flex items-center justify-center flex-wrap flex-row gap-4">
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
              setPage={setPage}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
            />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full md:w-[30%] md:sticky md:top-24 space-y-6">
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
