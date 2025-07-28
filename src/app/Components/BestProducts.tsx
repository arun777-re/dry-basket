"use client";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../_components/Button";


import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { getFeaturedProduct } from "@/redux/slices/productSlice";
import { ItemProps } from "@/lib/type";
import ProductCarousel from "../_components/ProductCarousel";

const BestProducts: React.FC = () => {
  const [product, setProduct] = React.useState<ItemProps[]>([]);
  const [section,setSection ] = React.useState<string>('nuts');
   const dispatch = useDispatch<AppDispatch>();
  



useEffect(() => {
  dispatch(getFeaturedProduct('Nuts'))
    .unwrap()
    .then((res) => {
      setSection('nuts');
      setProduct(res?.data);
    });
}, []);

  // function to get dynamically products for categories
  const getDriedFruits = (e:React.MouseEvent<HTMLButtonElement>)=>{
e.preventDefault();
setSection('nuts')
// here actual data comes from api
    dispatch(getFeaturedProduct('Nuts'))
      .unwrap()
      .then((res) => {
        setProduct(res?.data);
      }).catch((err)=>{
        console.error(err)
      });
  }

  const getSpicyMasala = (e:React.MouseEvent<HTMLButtonElement>)=>{
e.preventDefault();
setSection('almonds');
// here actual data comes from api
    dispatch(getFeaturedProduct('Tufani Almonds'))
      .unwrap()
      .then((res) => {
        setProduct(res?.data);
      }).catch((err)=>{
        console.error(err)
      });;
  }
  return (
    <section className="max-w-screen w-full relative min-h-screen mx-auto ">
      <div className="relative w-full flex flex-col items-center justify-center px-32 pt-16 pb-10">
        <header className="relative max-w-md w-full flex flex-col items-center justify-center ">
          <article className="w-full relative flex items-center flex-col">
            <h2>Best Products</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <div className="flex gap-2 items-center p-2">
              <FaStar size={18} className="text-first " />
              <FaStar size={25} className="text-body" />
              <FaStar size={18} className="text-first " />
            </div>
          </article>
          <div className="relative flex items-center w-full justify-center gap-8 py-8">
            <Button className={`${section === 'nuts' ? 'bg-first border-first text-white  drop-shadow-black/30 drop-shadow-xl'
      : 'bg-white border-head text-body '} border-2 
             text-body tracking-wide  hover:bg-first hover:border-first  hover:drop-shadow-xl hover:drop-shadow-black/30
                 transition-all duration-300 ease-in-out`} onClick={getDriedFruits}>
              Dried seeds
            </Button>
            <Button
             className={`${section === 'almonds' ? 'bg-first border-first text-white  drop-shadow-black/30 drop-shadow-xl'
      : 'bg-white border-head text-body '} border-2 
             text-body tracking-wide  hover:bg-first hover:border-first  hover:drop-shadow-xl hover:drop-shadow-black/30
                 transition-all duration-300 ease-in-out`}
            onClick={getSpicyMasala}>
              Spicy Masalas
            </Button>
          </div>
        </header>
        <section className="w-full max-w-screen relative">
          {section === 'nuts' && <ProductCarousel product={product}/>}
          
          {section === 'almonds' && <ProductCarousel product={product}/>
         }
        </section>
       
      </div>
    </section>
  );
};

export default BestProducts;
