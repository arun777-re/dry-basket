"use client";
import { Metadata } from "next";
import Banner from "@/app/Components/Banner";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import Image from "next/image";
import React, { useEffect } from "react";
import { ItemProps } from "@/lib/type";
import Button from "@/app/_components/Button";
import Review from "@/app/Components/Review";
import ProductDescription from "@/app/_components/ProductDescription";
import AdditionalInfo from "@/app/_components/AdditionalInfo";
import ProductCard from "@/app/_components/card/ProductCard";
import DummyCard from "@/app/_components/card/DummyCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {
  getSingleProduct,
  getRelatedProduct,
  getFeaturedProduct,
  getRecommendedProduct,
} from "@/redux/slices/productSlice";
import { useParams } from "next/navigation";

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

const productData: ItemProps = {
  _id: "1",
  slug: "example-product",
  status: "available",
  ratingAverage: 4.5,
  ratingCount: 100,
  category: "almonds",
  productName: "California Almonds",
  title: "Example Product Title",
  price: 99.99,
  description:
    "Oil Rich Almonds exported from California.Once you use it then you must agin buy it from us",
  isFeatured: true,
  weight: 1.2,
  discount: 10,
  images: [
    "/images/card1-1.jpg",
    "/images/card1-2.jpg",
    "/images/card2-1.jpg",
    "/images/card2-2.jpg",
  ],
  reviews: [
    {
      userName: "John Doe",
      rating: 5,
      reviewText: "Great product!",

      createdAt: "01/02/2025",
    },
    {
      userName: "Jane Smith",
      rating: 4,
      reviewText: "Very good quality.",
      createdAt: "01/02/2025",
    },
  ],
  tags: ["almonds-in-sonipat", "oil rich almonds"],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { slug } = useParams();

  // state to save productdata
  const [products, setProducts] = React.useState<ItemProps[]>([]);
  const [product, setProduct] = React.useState<ItemProps | null>(null);
  const [recommendedProducts, setRecommendedProducts] = React.useState<ItemProps[]>([]);


  // state to set images to the container after clicking on thumbnail
  const [selectParagraph, setSelectParagraph] =
    React.useState<string>("additional");

  // here actual data of a product comes from backend
  React.useEffect(() => {
    if (slug && typeof slug === "string") {
      dispatch(getSingleProduct(slug))
        .unwrap()
        .then((res) => {
          setProduct(res?.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }

   
  }, [dispatch,slug]);

//   get related products

  useEffect(()=>{
    if(product?.productName){
 dispatch(getRelatedProduct({productName:product?.productName,
        category:product?.category,
        query:{page:1,limit:5}
      }))
        .unwrap()
        .then((res) => {

        })
        .catch((err) => {});
    }
      
  },[dispatch,product?.productName])

//   get recommended featured products
  useEffect(()=>{
if(product?.category){
  dispatch(getRecommendedProduct({catId:product.category,query:{page:1,limit:5}}))
        .unwrap()
        .then((res) => {
            setRecommendedProducts(res?.data);
        })
        .catch((err) => {
            console.error(err);
        });
}
    
  },[dispatch,product?.category])

console.log('product...........',product);
console.log('products...........',products);
console.log('recommendedproducts...........',recommendedProducts);

  return (
    <div className="max-w-screen w-full mx-auto relative overflow-hidden">
      <Navbar />
      <Banner heading="Product" />
      <section className="w-full relative h-auto">
        <div className="w-full h-auto relative flex flex-col items-start justify-center px-30 py-20">
          <ProductDescription
            images={productData.images}
            ratingCount={productData?.ratingCount}
            description={productData?.description}
            price={productData?.price}
            productName={productData?.productName}
          />
          <div className="w-full relative h-auto">
            <div className="flex items-start justify-start gap-2">
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
                onClick={() => setSelectParagraph("reviews")}
                className={`border-2 px-4 py-2 text-sm font-semibold ${
                  selectParagraph === "reviews"
                    ? "bg-first text-white border-first"
                    : "bg-transparent text-head border-head"
                } rounded-none transition-all duration-500 ease-in-out`}
              >
                Reviews
              </Button>
            </div>
            <div className="flex relative w-full flex-col items-start justify-center px-8 py-6 shadow-md">
              {selectParagraph === "additional" ? (
                <AdditionalInfo />
              ) : (
                <Review reviews={productData.reviews} />
              )}
            </div>
          </div>
          <div className="w-full relative h-auto pt-20 flex flex-col items-center gap-16">
            <div className="w-full relative">
              <h4 className="text-center mb-4">Related Products</h4>
              <div className="w-full relative flex flex-row items-center gap-6">
                {products && products.length > 0 ? (
                  products.slice(0, 4).map((value, key) => {
                    return (
                      <ProductCard
                        key={key}
                        images={value.images}
                        price={value.price}
                        slug={value.slug}
                        title={value.productName}
                        _id={value._id}
                      />
                    );
                  })
                ) : (
                  <div className="w-full relative h-auto flex flex-row gap-6 flex-wrap items-center">
                    {[...Array(4)].map((_, key) => (
                      <DummyCard key={key} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full relative">
              <h4 className="text-center mb-4">Recommended Products</h4>
              <div className="w-full h-auto relative flex items-center flex-wrap gap-6">
                {recommendedProducts && recommendedProducts.length > 0 ? (
                  recommendedProducts.slice(0, 4).map((value, key) => {
                    return (
                        <div className="w-1/5" key={key}>

                      <ProductCard 
                      productId={value._id}
                       {...value}
                      />
                        </div>

                    );
                  })
                ) : (
                  <div className="w-full relative h-auto flex flex-row gap-6 flex-wrap items-center">
                    {[...Array(4)].map((_, key) => (
                      <DummyCard key={key} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductPage;
