import React from 'react'
import { FaStar } from 'react-icons/fa'

const StarRating = ({rating,setRating}:{rating:number,setRating:(n:number) => void}) => {
  return (
    <div className='flex gap-1'>
        {[...Array(5)].map((_,index)=>(
            <button 
            key={index}
            type='button'
            onClick={()=>setRating(index)}
            className='text-prdct hover:scale-100 transition-transform duration-300 ease-in-out'
            >
                <FaStar fill={index <= rating ? '#339999' : "#ccc"}/>
            </button>
        ))}
    </div>
  )
}

export default StarRating