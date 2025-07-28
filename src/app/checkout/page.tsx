'use client'

import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LuShoppingBag } from "react-icons/lu";
import Formik from 'formik';

const CheckOutPage = () => {

  const router = useRouter();

  return (
    <div className='max-w-screen w-full relative min-h-screen h-auto mx-auto bg-black/80'>
       <header className='w-full h-20 px-40 flex items-center justify-between '>
       <h4>DryBasket</h4>
        <LuShoppingBag size={20} className='text-2xl text-blue-700 cursor-pointer' onClick={()=>router.push(ROUTES.CART) }/>
       </header>
       <main className="relative w-full min-h-full h-auto pl-30 flex items-start justify-start gap-10">
        <div className="relative flex flex-col items-start w-1/2 h-auto">
           <div className="relative w-full h-auto flex items-start flex-col gap-4">
            <label htmlFor="contact" className='text-start text-xl text-white'>Contact</label>
            <input type="text" id="contact" placeholder='Email or phone number' 
            className='w-full h-10 px-2  text-black bg-white rounded-sm outline-2
             outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-body 
             transition-all duration-500 ease-in-out focus:placeholder:text-blue-700
             '/>
             <div className="flex gap-2 w-full items-start">
              <input type="checkbox" name="agreeForBlogs" id="agreeForBlogs" className='w-4 h-4 cursor-pointer' />
              <p className="text-white text-sm text-center">Email me with blogs</p>
             </div>
           </div>
           <div className="relative w-full h-auto flex items-start flex-col gap-4">
            <label htmlFor="contact" className='text-start text-xl text-white'>Delivery</label>
          <div className="flex flex-col relative w-full h-auto gap-3">
             <div className="relative flex gap-3 w-full items-start ">
               <input type="text" id="contact" placeholder='First name' 
            className='w-full h-10 px-2  text-black bg-white rounded-sm outline-2
             outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-body 
             transition-all duration-500 ease-in-out focus:placeholder:text-blue-700
             '/>  <input type="text" id="contact" placeholder='Last name' 
            className='w-full h-10 px-2  text-black bg-white rounded-sm outline-2
             outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-body 
             transition-all duration-500 ease-in-out focus:placeholder:text-blue-700
             '/>
             </div>
              <input type="text" id="address" placeholder='Address' name='address'
            className='w-full h-10 px-2  text-black bg-white rounded-sm outline-2
             outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-body 
             transition-all duration-500 ease-in-out focus:placeholder:text-blue-700
             '/>
              <input type="text" id="address" placeholder='Apartment, suite, etc. (optional)' name='appartment'
            className='w-full h-10 px-2  text-black bg-white rounded-sm outline-2
             outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-body 
             transition-all duration-500 ease-in-out focus:placeholder:text-blue-700
             '/>
             <div className="relative w-full flex items-center justify-center gap-3">
               <input type="text" id="address" placeholder='City' name='city'
            className='w-1/3 h-10 px-2  text-black bg-white rounded-sm outline-2
             outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-body 
             transition-all duration-500 ease-in-out focus:placeholder:text-blue-700
             '/>
               <input type="text" id="address" placeholder='State' name='state'
            className='w-1/3 h-10 px-2  text-black bg-white rounded-sm outline-2
             outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-body 
             transition-all duration-500 ease-in-out focus:placeholder:text-blue-700
             '/>
               <input type="text" id="address" placeholder='Pin Code' name='pinCode'
            className='w-1/3 h-10 px-2  text-black bg-white rounded-sm outline-2
             outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-body 
             transition-all duration-500 ease-in-out focus:placeholder:text-blue-700
             '/>
             </div>
          </div>
             <div className="flex gap-2 w-full items-start">
              <input type="checkbox" name="agreeTosave" id="agreeTosave" className='w-4 h-4 cursor-pointer'/>
              <p className="text-white text-sm text-center">Save this information for next time</p>
             </div>
           </div>
        </div>
        <div className="relative w-1/2 min-h-screen bg-white p-5 flex flex-col items-start">
        
        </div>


       </main>
      </div>
  )
}

export default CheckOutPage