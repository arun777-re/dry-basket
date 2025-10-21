'use client'
import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Button from './Button'

interface PaginationProps {
  page: number
  setPage: (value: number | ((prev: number) => number)) => void
  hasPrevPage: boolean
  hasNextPage: boolean
  length?: number
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  hasNextPage,
  hasPrevPage,
  length
}) => {
  const limit = 10

  return (
    <div className="flex items-center justify-center w-full mt-8 gap-3 sm:gap-6 flex-wrap">
      {/* Prev Button */}
      <Button
        className={`flex items-center justify-center bg-white border border-head text-head 
          hover:bg-head hover:text-white transition-all duration-300 rounded-full p-2 sm:p-3 shadow-md
          disabled:opacity-40 disabled:cursor-not-allowed`}
        disabled={!hasPrevPage}
        onClick={() => setPage((p: number) => p - 1)}
        aria-label="Previous Page"
      >
        <FaChevronLeft size={18} />
      </Button>

      <span className="px-5 py-2 sm:px-7 sm:py-2.5 bg-first text-white text-sm sm:text-base rounded-full shadow-inner font-semibold tracking-wide select-none">
        Page {page}
      </span>

      <Button
        className={`flex items-center justify-center bg-white border border-head text-head 
          hover:bg-head hover:text-white transition-all duration-300 rounded-full p-2 sm:p-3 shadow-md
          disabled:opacity-40 disabled:cursor-not-allowed`}
        disabled={(length && length < limit) || !hasNextPage}
        onClick={() => setPage((p: number) => p + 1)}
        aria-label="Next Page"
      >
        <FaChevronRight size={18} />
      </Button>
    </div>
  )
}

export default Pagination
