// SSG + ISR Page Component
export const dynamic = "force-static";
 import {  PaginatedProductResponse } from '@/types/response';
import { BlogsIncomingDTO } from '@/types/blog';
import { ROUTES } from '@/constants/routes';
import AllBlogs from '../Components/AllBlogs';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Banner from '../Components/Banner';


export default async function AllBlogsPage({
  searchParams,
}: any) {
  const params = searchParams;
      const rawPage = params?.page;
  const page = Array.isArray(rawPage) ? Number(rawPage[0]) : Number(rawPage) || 1;
  const safePage =  isNaN(page) || page < 1 ? 1 : page;
  const limit = 10;
  let data:PaginatedProductResponse<BlogsIncomingDTO>;
  try {

      const res = await fetch(`${ROUTES.BLOGSURLS.GETALL_BLOG}?page=${safePage}&&limit=${limit}`, {
    next: { revalidate: 10 }, 
    cache: 'force-cache',

  });
  data = await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    data = {
      success: false,
      message: "Error fetching blogs",
      status: 500,
      data: [],
      currentPage: safePage,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }

  return (
    <>
      <Navbar />
      <Banner heading='Blogs' />
      <AllBlogs page={safePage} data={data}/>
      <Footer />
    </>
  );
}