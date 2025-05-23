import Banner from '@/app/Components/Banner'
import Footer from '@/app/Components/Footer'
import Navbar from '@/app/Components/Navbar'
import React from 'react'

const CompleteBlog = () => {
  return (
    <div className='max-w-screen w-full h-auto mx-auto relative'>
        <Navbar/>
   <Banner/>
   <Footer/>
    </div>
  )
}

export default CompleteBlog