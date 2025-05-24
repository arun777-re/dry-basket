'use client';
import React from 'react';
import DummyCard from '../_components/card/DummyCard';


const DummyComponent = () => {
  return (
       <section className='w-full h-auto flex items-center justify-between flex-wrap gap-8'>
                {
[...Array(6)].map((_,index)=>{
            return (
                <DummyCard key={index}/>
            )
          })
                }
            </section>
  )
}

export default DummyComponent