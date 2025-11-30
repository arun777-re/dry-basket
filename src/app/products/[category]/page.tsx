'use client'
import Category from '@/app/Components/Category'
import Footer from '@/app/Components/Footer'
import Navbar from '@/app/Components/Navbar'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PremiumProduct from '@/app/Components/PremiumProduct'
import { ProductIncomingDTO } from '@/types/product'
import { useFetchCategoryProducts } from '@/hooks/fetchCategoryProduct'
import Head from 'next/head'
import HeroBanner from '@/app/Components/HeroBanner'

const ProductByCategory = () => {
  const [products, setProducts] = useState<ProductIncomingDTO[]>([])
  const pathname = usePathname()
  const { category } = useParams()

  const { fetchAllProductsAssociatedWithCategory } = useFetchCategoryProducts()

  useEffect(() => {
    fetchAllProductsAssociatedWithCategory({
      catname: category as string,
      setProducts,
      page: 1,
      limit: 10,
    })
  }, [category])

  const categoryName = Array.isArray(category) ? category[0] : category

  // seo info
  const pageTitle = categoryName
    ? `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products | YourSiteName`
    : 'Products | YourSiteName'

  const pageDescription = categoryName
    ? `Browse our premium ${categoryName} collection. High-quality products delivered fast to your doorstep.`
    : 'Browse our products collection. High-quality products delivered fast.'

  const canonicalUrl = `https://yourwebsite.com${pathname}`

  return (
    <div className="w-full h-auto mx-auto overflow-x-hidden">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`buy ${categoryName}, ${categoryName} online, premium ${categoryName}`} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://yourwebsite.com/images/default-category.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://yourwebsite.com/images/default-category.jpg" />
      </Head>

      <Navbar />
      <div className="w-full">
        <HeroBanner heading={pathname.startsWith("/") ? pathname.slice(1) : pathname} />
      </div>

      <div className="w-full px-2 sm:px-4 md:px-8">
        <Category searchValue={categoryName} />
      </div>

      <div className="w-full px-2 sm:px-4 md:px-8">
        <PremiumProduct />
      </div>

      <Footer />
    </div>
  )
}

export default ProductByCategory
