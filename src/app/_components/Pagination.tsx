'use client'
import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Button from './Button';

interface PaginationProps {
    page:number;
    setPage: (value: number | ((prev: number) => number)) => void;
    hasPrevPage:boolean;
    hasNextPage:boolean;
    length?:number
}

const Pagination:React.FC<PaginationProps> = ({page,setPage,hasNextPage,hasPrevPage,length}) => {
  const limit = 10;
  return (
  <div className="flex flex-row justify-center items-center gap-4 mt-6">
    <Button
 
    className="bg-transparent text-white "
    disabled={!hasPrevPage}
    onClick={() => setPage((p:number) => p - 1)}
  >
    <FaChevronLeft size={20} className='text-head hover:text-head/70'/>
  </Button>

  <span className="px-4 py-2 bg-yellow-50 text-first rounded font-medium shadow-inner">
    {page}
  </span>

  <Button
    className="bg-transparent text-white "
    disabled={(length && length < limit) || !hasNextPage}
    onClick={() => setPage((p:number) => p + 1)}
  >
    <FaChevronRight size={20} className='text-head hover:text-head/70'/>
  </Button>
</div>
  )
}

export default Pagination