"use client";
import { Metadata } from "next";
import Banner from "@/app/Components/Banner";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import React, { useEffect } from "react";
import Button from "@/app/_components/Button";
import Review from "@/app/Components/Review";
import ProductDescription from "@/app/_components/ProductDescription";
import AdditionalInfo from "@/app/_components/AdditionalInfo";
import { useParams } from "next/navigation";
import { ProductIncomingDTO } from "@/types/product";
import { useFetchCategoryProducts } from "@/hooks/fetchCategoryProduct";
import ProductSection from "@/app/Components/ProductSection";
import ProductInformation from "@/app/_components/ProductInformation";
import { defaultPopulatedCartResponse } from "@/redux/services/helpers/cart/cartresponse";
import { defaultProductState, singleProductState } from "@/redux/services/helpers/productresponse";

interface GenerateMetaDataProps {
  params: {
    slug: string;
  };
}

// export async function generateMetadata({
//   params,
// }: GenerateMetaDataProps): Promise<Metadata> {
//   const product = await getProductBySlug(params.slug);

//   return {
//     title: product?.productName || "Product Page",
//     description: product?.description || "Product details and information",
//     openGraph: {
//       title: product?.productName || "Product Page",
//       description: product?.description || "Product details and information",
//       images: [
//         {
//           url: product?.images
//             ? Array.isArray(product.images)
//               ? product.images[0]
//               : product.images
//             : "/default-product-image.jpg",
//           alt: product?.productName || "Product Image",
//         },
//       ],
//     },
//   };
// }

const ProductPage: React.FC = () => {
  const { slug } = useParams();

  // getting api functions from hook
  const {
    fetchSingleProductWithSlug,
    fetchRelatedProducts,
    fetchRecommendedProducts,
  } = useFetchCategoryProducts();
  // state to save product
  const [relatedProducts, setRelatedProducts] = React.useState<
    ProductIncomingDTO[]
  >([]);
  const [product, setProduct] = React.useState<ProductIncomingDTO>(singleProductState?.data!);
  const [recommendedProducts, setRecommendedProducts] = React.useState<
    ProductIncomingDTO[]
  >([]);

  // state to set images to the container after clicking on thumbnail
  const [selectParagraph, setSelectParagraph] =
    React.useState<string>("additional");

  // here actual data of a product comes from backend
  React.useEffect(() => {
    let active = true;
    if (slug && typeof slug === "string") {
      fetchSingleProductWithSlug({ slug, setProduct: setProduct });
    }

    // to avoid race condition of state on component unmount
    return () => {
      active = false;
    };
  }, [slug]);

  //   get related products

  useEffect(() => {
    let active = true;
    if (product?.productName) {
      fetchRelatedProducts({
        category: product?.category,
        productName: product?.productName,
        setProduct: setRelatedProducts,
        limit: 10,
        page: 1,
      });
    }

    // to avoid race condition of state on component unmount
    return () => {
      active = false;
    };
  }, [product?.productName]);

  //   get recommended featured products
  useEffect(() => {
    let active = true;
    if (product?.category) {
      fetchRecommendedProducts({
        catId: product?.category,
        setProduct: setRecommendedProducts,
        limit: 10,
        page: 1,
      });
    }
    // to avoid race condition of state on component unmount
    return () => {
      active = false;
    };
  }, [product?.category]);

  return (
    <div className="max-w-screen w-full mx-auto relative overflow-hidden">
      <Navbar />
      <Banner heading="Product" />
      <section className="w-full relative h-auto">
        <div className="w-full h-auto relative flex flex-col items-start justify-center px-30 py-20">
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
          <div className="w-full relative h-auto">
            <div className="flex items-start justify-start gap-2">
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
            <div className="flex relative w-full flex-col items-start justify-center px-8 py-6 shadow-md">
              {selectParagraph === "additional" && <AdditionalInfo />}
              {selectParagraph === "review" && (
                <Review
                  avgRating={product?.avgRating ?? 1}
                  productId={product?._id!}
                />
              )}
              {selectParagraph === "product" && <ProductInformation description={product?.description}/>}
            </div>
          </div>
          <div className="w-full relative h-auto pt-20 flex flex-col items-center gap-16">
            <ProductSection
              title="Related Products"
              products={relatedProducts}
            />
            <ProductSection
              title="Recommended Products"
              products={recommendedProducts}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductPage;
