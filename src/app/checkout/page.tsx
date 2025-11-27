'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { LuShoppingBag } from 'react-icons/lu';
import CheckOutForm from '../_components/form/CheckOutForm';

const CheckOutPage = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-black/80">
      <header className="w-full h-16 sm:h-20 px-4 sm:px-8 md:px-16 lg:px-32 flex items-center justify-between">
        <h3 className="text-first md:text-xl lg:text-2xl">
          DryBasket
        </h3>
        <LuShoppingBag
          size={24}
          className="text-blue-700 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => router.push('/cart')}
        />
      </header>
        <div className="flex-1">
          <CheckOutForm />
        </div>

   
    </div>
  );
};

export default CheckOutPage;
