import { Button } from '@/components/ui/button'
import { Card } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react';

interface PremiumCardProps {
    image:string;
    category?:string;
    description?:string;

}

const PremiumCard:React.FC<PremiumCardProps> = ({
    image,
    category,
    description
}) => {
  return (
    <Card className='h-90 w-[19vw] relative border border-amber-400'>
        <div className="w-full h-full relative flex flex-col items-center justify-center gap-6">
            <div className="relative w-full h-[45%]">
<Image
src={image ?? '/images/banner-4.jpg'}
alt='quality-product'
fill
priority
className='object-cover object-center'
/>
            </div>
<article className="w-full relative h-[55%] flex flex-col items-center gap-4 px-2">
   <h5 className='mb-0'>{category}</h5>
   <p className='text-center'>{description}</p>
       <Button
            className="bg-transparent border-2 border-head rounded-full px-7 py-6
    text-body tracking-wide hover:border-first hover:bg-first transition-all duration-500 ease-in-out cursor-pointer"
          >
            View More
          </Button>
</article>
        </div>
    </Card>
  )
}

export default PremiumCard