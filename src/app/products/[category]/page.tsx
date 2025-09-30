'use client'
import Banner from '@/app/Components/Banner'
import Category from '@/app/Components/Category'
import Footer from '@/app/Components/Footer'
import Navbar from '@/app/Components/Navbar'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import PremiumProduct from '@/app/Components/PremiumProduct'
import { ProductIncomingDTO } from '@/types/product'
import { useFetchCategoryProducts } from '@/hooks/fetchCategoryProduct'

const ProductByCategory = () => {
  // state to hold products data instantly when api fetches 
  const [products, setProducts] = React.useState<ProductIncomingDTO[]>([])
  const pathname = usePathname()
  const { category } = useParams();

  const { fetchAllProductsAssociatedWithCategory } = useFetchCategoryProducts()

  React.useEffect(() => {
    fetchAllProductsAssociatedWithCategory({
      catname: category as string,
      setProducts: setProducts,
      page: 1,
      limit: 10,
    })
  }, [category]) // re-fetch when category changes

  return (
    <div className="w-full h-auto mx-auto overflow-x-hidden">
      <Navbar />

      <div className="w-full">
        <Banner heading={pathname.startsWith("/") ? pathname.slice(1) : pathname} />
      </div>

      <div className="w-full px-2 sm:px-4 md:px-8">
      <Category searchValue={Array.isArray(category) ? category[0] : category} />
      </div>
      {/* Premium products section */}
      <div className="w-full px-2 sm:px-4 md:px-8">
        <PremiumProduct />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ProductByCategory
