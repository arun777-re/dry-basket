'use client';
import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer'
import { FaStar } from 'react-icons/fa'
import { Card } from '@radix-ui/themes';

const faqData = [
    {
        question:"How will my order be delivered to me?",
        answer:"First you have to complete your procedure like select products which you want to buy then add to cart then checkout then a order will be created for you and our delievery partner will approach to you."
    },
    {
        question:"How will my order be delivered to me?",
        answer:"First you have to complete your procedure like select products which you want to buy then add to cart then checkout then a order will be created for you and our delievery partner will approach to you."
    },
    {
        question:"How will my order be delivered to me?",
        answer:"First you have to complete your procedure like select products which you want to buy then add to cart then checkout then a order will be created for you and our delievery partner will approach to you."
    },
    {
        question:"How will my order be delivered to me?",
        answer:"First you have to complete your procedure like select products which you want to buy then add to cart then checkout then a order will be created for you and our delievery partner will approach to you."
    },
];

const FaqPage = () => {
    const [active,setActive] = React.useState<number | null>(null)
  return (
    <div className='max-w-screen w-full h-auto mx-auto overflow-x-hidden'>
        <Navbar/>
        <Banner heading='FAQ'/>
        <section className="max-w-screen w-full h-auto relative">
                <div className="w-full h-full px-30 py-20 relative flex flex-col items-center justify-center gap-10">
                      <header className="relative max-w-lg w-full flex flex-col items-center justify-center ">
                            <h2>Frequently Asked Questions</h2>
                            <p>
                              A lot more questions.
                            </p>
                            <div className="flex gap-2 items-center p-2">
                              <FaStar size={18} className="text-first " />
                              <FaStar size={25} className="text-body" />
                              <FaStar size={18} className="text-first " />
                            </div>
                          </header>
                  <section className="w-full h-full  gap-4 flex flex-col items-center justify-center">
          {faqData &&
                    faqData.map((item, key) => {
                      return (
                        <Card
                          key={key}
                          className="w-full h-auto relative "
                        >
                         <article className='w-full relative h-auto flex flex-col'>
                            <div className="bg-gray-200 relative w-full py-3 px-4" onClick={()=>setActive(key)}>
                               <h5 className='text-head'>{item?.question}
                                </h5> 
                            </div>
                            <div className={`${active === key ? 'max-h-[200px] opacity-100 ' : 'max-h-0 h-0 opacity-0 '}
                            transition-all duration-500 ease-in-out
                            bg-gray-100 h-auto relative w-full py-3 px-4`}>
                               <p>{item?.answer}
                                </p> 
                            </div>
                         </article>
                        </Card>
                      );
                    })}
                  </section>
                
                </div>
              </section>
        <Footer/>
    </div>
  )
}

export default FaqPage