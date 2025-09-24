import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const SearchBar:React.FC = () => {
    const [search,setSearch] = React.useState<string>('');
    const router = useRouter();
    const handleSubmit = (e:React.FormEvent)=>{
         e.preventDefault();
         if(!search){
            toast.error('Please enter productname/category to search')
            return;
         }
router.push(`/search-products?searchValue=${search}`);
         setSearch('');
    }
  return (
    <div>
        <form method="post" onSubmit={handleSubmit}>
            <input type="text"
            name='searchValue'
            placeholder='Search Products...'
            className='w-full p-4 outline-1 outline-amber-200 placeholder:text-black'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    </div>
  )
}

export default SearchBar