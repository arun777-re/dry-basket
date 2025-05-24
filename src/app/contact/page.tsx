import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'

const ContactPage = () => {
  return (
    <div className='max-w-screen w-full h-auto mx-auto'>
        <Navbar/>
        <Banner heading='Contact Us'/>
        <Footer/>
    </div>
  )
}

export default ContactPage