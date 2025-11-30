'use client'
import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ShopProducts from '../Components/ShopProducts'
import { usePathname } from 'next/navigation'
import HeroBanner from '../Components/HeroBanner'

const AllProducts = () => {

  const pathName = usePathname();

  return (
    <>
      <Navbar/>
      <HeroBanner heading={"Shop"}/>
      <ShopProducts/>
      <Footer/>
    </>
  )
}

export default AllProducts