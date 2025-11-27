"use client";

import React, { useState } from "react";
import FilterBar from "../_components/FilterBar";
import ProductGrid from "../_components/ProductGrid";

const ShopProduct = () => {
  const [page, setPage] = useState<number>(1);

  return (
    <section className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-10 px-4 sm:px-6 md:px-8 py-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 lg:w-1/4">
          <FilterBar page={page} />
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <ProductGrid page={page} setPage={setPage} />
        </div>
      </div>
    </section>
  );
};

export default ShopProduct;
