'use client'
import useBlogHook from '@/hooks/blogHook';
import React from 'react'
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner';
import Footer from '../Components/Footer';

const AllBlogsPage = () => {

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
    <>
    <Navbar/>
    <Banner/>

    <Footer/>
    </>
  )
}

export default AllBlogsPage;