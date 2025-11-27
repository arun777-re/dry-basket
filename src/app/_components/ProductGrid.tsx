"use client";

import React from "react";
import { useFetchCategoryProducts } from "@/hooks/fetchCategoryProduct";
import ProductCard from "../_components/card/ProductCard";
import Pagination from "../_components/Pagination";
import Spinner from "../_components/Spinner";

type ProductGridProps = {
  page: number;
  setPage: (value:any) => void;
};

const ProductGrid: React.FC<ProductGridProps> = ({ page, setPage }) => {
  const { products, loading, error } = useFetchCategoryProducts();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spinner />
      </div>
    );
  }

  if (error && error?.status !== 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <h5 className="text-red-500 font-medium">{error.message}</h5>
      </div>
    );
  }

  const hasNextPage = !!products?.hasNextPage;
  const hasPrevPage = !!products?.hasPrevPage;

  return (
    <main>
      {products?.data?.length ? (
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.data.map((item) => (
            <ProductCard
              key={item._id || item.slug}
              productName={item.productName ?? ""}
              variants={item.variants ?? []}
              slug={item.slug ?? ""}
              images={item.images ?? ["/images/banner-1.jpg"]}
              category={item.category ?? ""}
              productId={item._id}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full py-20">
          <h1 className="text-lg font-medium text-gray-600">No products available</h1>
        </div>
      )}

      {/* Pagination */}
      {products && (
        <div className="mt-6">
          <Pagination
            page={page}
            setPage={setPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        </div>
      )}
    </main>
  );
};

export default ProductGrid;
