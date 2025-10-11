"use client";
import React from "react";
import DummyCard from "./card/DummyCard";

const DummyComponent = () => {
  return (
    <section
      className="
        w-[100vw] 
        h-auto 
        gap-4 sm:gap-5 lg:gap-6 
        px-4 sm:px-6 lg:px-8 
        py-6 sm:py-8 lg:py-10
        flex flex-row flex-wrap items-center justify-center
      "
    >
      {[...Array(3)].map((_, index) => (
        <DummyCard key={index} />
      ))}
    </section>
  );
};

export default DummyComponent;
