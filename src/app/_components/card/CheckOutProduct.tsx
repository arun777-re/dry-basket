'use client'
import Image from 'next/image'
import React from 'react'

type CheckOutProductProps = {
    imageSrc:string;
    productName:string;
    priceAfterDiscount?:number;
    quantity:number;
     weight:number;
}
const CheckOutProduct:React.FC<CheckOutProductProps> = ({
    imageSrc,
    priceAfterDiscount,
    productName,
    quantity,
    weight
}) => {
  return (
    <div className='relative w-full lg:w-3/4 min-h-10 h-18 flex flex-row items-center justify-between bg-white'>
     <div className="h-full relative w-[72%] sm:w-[40%]  lg:w-[56%] flex items-center justify-between gap-2 ">
        <div className="w-20 relative h-full rounded-sm border border-gray-200 flex items-center justify-center">
       {
        imageSrc ? ( <Image
        src={imageSrc || '/images/bg-prod.png'}
        fill
        alt="product-image"
        className="object-fill object-center rounded-sm"
        />) : null
       }
          <div className="absolute rounded-full w-6 h-6 bg-gray-700/88 flex items-center justify-center -top-2 -right-2 z-20">
            <p className="text-xs text-white text-center">{quantity}</p>
        </div>
        </div>
        
      
        <article className="w-1/2 h-full relative items-start justify-center flex flex-col gap-2">
         <p className="text-sm text-black leading-tight">{productName}</p>
         <p className="text-xs text-black">{weight}&nbsp;gm</p>
        </article>
     </div>
       <p className="text-sm text-black">Rs{priceAfterDiscount}</p>
    </div>
  )
}

export default CheckOutProduct