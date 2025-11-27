'use client'
import React from 'react'
import Banner from '../Components/Banner'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ShopProducts from '../Components/ShopProducts'
import { usePathname } from 'next/navigation'

const AllProducts = () => {

  const pathName = usePathname();

  return (
    <>
      <Navbar/>
      <Banner heading={"Shop"}/>
      <ShopProducts/>
      <Footer/>
    </>
  )
}

export default AllProducts