import { Card } from '@radix-ui/themes'
import React from 'react';
import { LuRefreshCw } from "react-icons/lu";
import { BsBriefcase } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";
    export const processData = [
        {
            icon:<LuRefreshCw size={30} className='text-white'/>,
            title:"Money Back Guarantee",
            description:"Sit amet dolor consecteur adipisicing elitsed to eiusmod tempor incident umbrella et dollar units et dolar."
        },
        {
            icon:<BsBriefcase size={30} className='text-white'/>,
            title:"Free Shipping",
            description:"Sit amet dolor consecteur adipisicing elitsed to eiusmod tempor incident umbrella et dollar units et dolar."
        },
        {
            icon:<FaRegClock size={30} className='text-white'/>,
            title:"24/7 Customer Service",
            description:"Sit amet dolor consecteur adipisicing elitsed to eiusmod tempor incident umbrella et dollar units et dolar."
        },
    ]

const Process = () => {



  return (
    <section className='max-w-screen w-full h-[60vh] relative'>
        <div className="w-full h-full px-30 py-20 relative flex items-center justify-center gap-10">
{
    processData && processData.map((item,key)=>{
        return(
            <Card key={key} className='w-[25vw] h-55 relative rounded-md place-items-center border-2 border-gray-200
            '>
                <div className="w-[70px] h-[70px] relative border
                 border-head rounded-full bg-head flex items-center justify-center cursor-pointer
                 hover:bg-first -mt-9 transition-all duration-500 ease-in-out">
                 {item?.icon}
                </div>
                <article className="flex flex-col items-center justify-center gap-2 px-4 py-5">
                    <h5 className="text-head hover:text-first  transition-all duration-500 ease-in-out">{item?.title}</h5>
                    <p className='text-center leading-loose'>{item?.description}</p>
                </article>

            </Card>
        )
    })
}
        </div>
    </section>
  )
}

export default Process