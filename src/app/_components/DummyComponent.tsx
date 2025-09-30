'use client';
import React from 'react';
import DummyCard from './card/DummyCard';

const DummyComponent = () => {
  return (
    <section className="w-full h-auto grid gap-6 px-4 py-8
      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
      place-items-center">
      {[...Array(6)].map((_, index) => (
        <DummyCard key={index} />
      ))}
    </section>
  );
};

export default DummyComponent;
