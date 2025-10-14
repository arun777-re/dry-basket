"use client";
import Banner from "@/app/Components/Banner";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import React, { useEffect, useState } from "react";
import Button from "@/app/_components/Button";
import Review from "@/app/Components/Review";
import ProductDescription from "@/app/_components/ProductDescription";
import AdditionalInfo from "@/app/_components/AdditionalInfo";
import { useParams } from "next/navigation";
import { ProductIncomingDTO } from "@/types/product";
import { useFetchCategoryProducts } from "@/hooks/fetchCategoryProduct";
import ProductSection from "@/app/Components/ProductSection";
import ProductInformation from "@/app/_components/ProductInformation";
import { singleProductState } from "@/redux/services/helpers/productresponse";
import useInteractionHook from "@/hooks/interactionHook";
import Head from "next/head"; // 👈 for CSR SEO

const ProductPage: React.FC = () => {
  const { slug } = useParams();

  const {
    fetchSingleProductWithSlug,
    fetchRelatedProducts,
    fetchRecommendedProducts,
  } = useFetchCategoryProducts();

  const { getUserInteraction } = useInteractionHook();

  const [relatedProducts, setRelatedProducts] = useState<ProductIncomingDTO[]>([]);
  const [product, setProduct] = useState<ProductIncomingDTO>(
    singleProductState?.data!
  );
  const [recommendedProducts, setRecommendedProducts] = useState<ProductIncomingDTO[]>([]);
  const [selectParagraph, setSelectParagraph] = useState<string>("additional");

  // fetch single product
  useEffect(() => {
    if (slug && typeof slug === "string") {
      fetchSingleProductWithSlug({ slug, setProduct: setProduct });
    }
  }, [slug]);

  // fetch related
  useEffect(() => {
    (async () => {
      if (product?.productName) {
        await Promise.all([
          fetchRelatedProducts({
            category: product?.category,
            productName: product?.productName,
            setProduct: setRelatedProducts,
            limit: 10,
            page: 1,
          }),
          getUserInteraction({ productId: product._id, action: "view" }),
        ]);
      }
    })();
  }, [product?.productName]);

  // fetch recommended
  useEffect(() => {
    if (product?.category) {
      fetchRecommendedProducts({
        catId: product?.category,
        setProduct: setRecommendedProducts,
        limit: 10,
        page: 1,
      });
    }
  }, [product?.category]);

  // dynamic SEO meta data
  const metaTitle = product?.productName
    ? `${product.productName} | YourBrand`
    : "Product | YourBrand";
  const metaDescription =
    product?.description?.slice(0, 160) ||
    "Discover high-quality products available now at YourBrand.";
  const image = product?.images?.[0] || "/images/banner-2.jpg";
  const canonicalUrl = `https://yourdomain.com/product/${slug}`;

  return (
    <>
      {/*  SEO Meta Tags */}
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="YourBrand" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={image} />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product?.productName,
              image: product?.images,
              description: product?.description,
              sku: product?._id,
              brand: {
                "@type": "Brand",
                name: "YourBrand",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: product?.avgRating ?? 4.5,
                reviewCount: 120,
              },
            }),
          }}
        />
      </Head>

      <div className="max-w-screen w-full mx-auto relative overflow-hidden">
        <Navbar />
        <Banner heading={product?.productName || "Product"} />
        <section className="w-full relative h-auto">
          <div className="w-full h-auto relative flex flex-col items-start justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-10 md:py-16">
            <ProductDescription
              key={product?._id}
              _id={product?._id!}
              category={product?.category!}
              images={product?.images! || ["/images/banner-2.jpg"]}
              avgRating={product?.avgRating}
              description={product!.description}
              productName={product!.productName}
              variants={product?.variants!}
            />

            <div className="w-full relative h-auto mt-8">
              <div className="flex flex-wrap items-start justify-start gap-3">
                <Button
                  onClick={() => setSelectParagraph("product")}
                  className={`rounded-none px-4 py-2 text-sm font-semibold ${
                    selectParagraph === "product"
                      ? "bg-first text-white border-first"
                      : "bg-transparent text-head border-head"
                  } border-2 transition-all duration-500 ease-in-out`}
                >
                  Product Information
                </Button>
                <Button
                  onClick={() => setSelectParagraph("additional")}
                  className={`rounded-none px-4 py-2 text-sm font-semibold ${
                    selectParagraph === "additional"
                      ? "bg-first text-white border-first"
                      : "bg-transparent text-head border-head"
                  } border-2 transition-all duration-500 ease-in-out`}
                >
                  Additional Information
                </Button>
                <Button
                  onClick={() => setSelectParagraph("review")}
                  className={`border-2 px-4 py-2 text-sm font-semibold ${
                    selectParagraph === "review"
                      ? "bg-first text-white border-first"
                      : "bg-transparent text-head border-head"
                  } rounded-none transition-all duration-500 ease-in-out`}
                >
                  Reviews
                </Button>
              </div>

              <div className="flex relative w-full flex-col items-start justify-center px-4 md:px-8 py-6 shadow-md mt-4">
                {selectParagraph === "additional" && <AdditionalInfo />}
                {selectParagraph === "review" && (
                  <Review
                    avgRating={product?.avgRating ?? 1}
                    productId={product?._id!}
                  />
                )}
                {selectParagraph === "product" && (
                  <ProductInformation description={product?.description} />
                )}
              </div>
            </div>

            {/* Related & Recommended */}
            <div className="w-full relative h-auto pt-16 flex flex-col items-center gap-16">
              <ProductSection title="Related Products" products={relatedProducts} />
              <ProductSection title="Recommended Products" products={recommendedProducts} />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
