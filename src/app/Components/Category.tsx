'use client'

import React from 'react';
import ProductCard from '../_components/card/ProductCard';
import { ProductIncomingDTO, SearchQueryDTO } from '@/types/product';
import { PaginatedProductResponse } from '@/types/response';
import useSearchProductHook from '@/hooks/useSearchProductHook';
import Pagination from '../_components/Pagination';
import Spinner from '../_components/Spinner';

type Props = {
  searchValue?: string
}

const Category: React.FC<Props> = ({ searchValue }) => {
  const [products, setProducts] = React.useState<PaginatedProductResponse<ProductIncomingDTO>>();
  const limit = 10;
  const [page, setPage] = React.useState<number>(1)
  const { getNavSearchProducts, loading } = useSearchProductHook();

  const isMounted = React.useRef(false);

  const searchQuery: SearchQueryDTO = {
    page,
    limit,
    searchValue
  };

  React.useEffect(() => {
     isMounted.current = true;
    if (!getNavSearchProducts) return;
    (async () => {
      const result = await getNavSearchProducts({ query: searchQuery });
      if (result && isMounted) setProducts(result);
    })();
    return () => {
      isMounted.current = false;
    }
  }, [getNavSearchProducts, page, searchValue]);

  const hasNextPage = !!(products && products.hasNextPage);
  const hasPrevPage = !!(products && products.hasPrevPage);

  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-10 lg:px-20 py-10">
      {products && products.data && Array.isArray(products.data) && products.data.length > 0 ? (
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {products.data.map((item, index) => (
            <ProductCard key={index} productId={item._id}
            images={item.images}
            productName={item.productName}
            variants={item.variants}
            slug={item.slug}
            category={item.category}
            />
          ))}
        </div>
      ) : (
        <section className='w-screen h-screen flex items-center justify-center flex-col'>
          <h1 className="text-lg font-semibold text-head mb-4">No Products to Show</h1>
          <Spinner/>
                  </section>
      )}
      <div className="mt-8 flex justify-center">
        <Pagination
          page={page}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          setPage={setPage}
        />
      </div>
    </section>
  );
};

export default Category;
