'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { TiArrowRightOutline } from "react-icons/ti";

const SearchBar: React.FC = () => {
  const [search, setSearch] = React.useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      toast.error('Enter product name / category to search');
      return;
    }
    router.push(`/search-products?searchValue=${encodeURIComponent(search)}`);
    setSearch('');
  };

  return (
    <div className="p-2 w-full">
      <form
        data-aos="fade-down"
        method="post"
        onSubmit={handleSubmit}
        className="w-full flex flex-col sm:flex-row items-stretch gap-2"
      >
        <input
          type="text"
          name="searchValue"
          placeholder="Search products..."
          className="
            flex-1 p-3 sm:p-4 rounded-md border 
            border-gray-300 focus:border-first focus:ring-2 focus:ring-first 
            placeholder-gray-400 text-gray-800 
            transition-all duration-200 shadow-sm
          "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="
            px-4 sm:px-6 py-3 rounded-md 
            bg-first text-white font-medium 
            flex items-center justify-center gap-1 
            hover:bg-first/90 focus:ring-2 focus:ring-offset-1 focus:ring-first 
            transition-colors duration-200 shadow-sm cursor-pointer
          "
        >
          <TiArrowRightOutline size={22} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
