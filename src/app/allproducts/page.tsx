'use client'
import React from 'react'
import Banner from '../Components/Banner'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ShopProducts from '../Components/ShopProducts'

const AllProducts = () => {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <ShopProducts/>
      <Footer/>
    </div>
  )
}

export default AllProducts