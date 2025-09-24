import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SearchQueryDTO } from "@/types/product";

type Props = {
  search?: boolean;
  setSearch?: (value: any) => any;
};

// Constant field configuration for better scalability
const SEARCH_FIELDS: {
  name: keyof SearchQueryDTO;
  type: "text" | "number";
  placeholder: string;
}[] = [
  { name: "category", type: "text", placeholder: "Category" },
  { name: "price", type: "number", placeholder: "Price" },
  { name: "productName", type: "text", placeholder: "Product Name" },
];

// framer motion variants 
const containerVariants = {
  hidden:{opacity:0,y:-30},
  visible:{opacity:1,y:0,transition:{duration:0.5,ease:'easeOut'}},
  exit:{opacity:0,y:-30,transition:{duration:0.3,ease:'easeIn'}},
}

const FilterBar: React.FC<Props> = ({ search, setSearch }) => {
  const router = useRouter();
  const [value, setValue] = React.useState<SearchQueryDTO>({
    category: "",
    productName: "",
    price:0,
  });
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(inputValue) : inputValue,
    }));
  },[]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    Object.entries(value).forEach(([key,val])=>{
      if(val) searchParams.append(key,String(val))
    })

    router.push(`/search-products?${searchParams.toString()}`);
    setValue({
      category: "",
      productName: "",
      price: 0,
    });
  },[value,router]);
  return (
    <motion.div
    initial='hidden'
    animate='visible'
    exit={'exit'}
    variants={containerVariants}
      className={` max-w-screen w-full absolute top-20 left-0 p-10 bg-white`}
    >
      <form
        action=""
        className="p-4 bg-gray-300/20 grid grid-cols-2 grid-rows-2 gap-4"
        onSubmit={handleSubmit}
      >
        {SEARCH_FIELDS.map((field) => (
          <input
            type={field.type}
            key={field.name}
            className="w-full py-4 outline-1 outline-amber-200 placeholder:text-black"
            name={field.name}
            placeholder={field.placeholder}
            value={value[field.name] as string | number}
            onChange={handleChange}
          />
        ))}

        <button type="submit" className="border-2 border-green-400">
          Search
        </button>
      </form>
    </motion.div>
  );
};

export default FilterBar;
