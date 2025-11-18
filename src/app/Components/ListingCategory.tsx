"use client";
import Image from "next/image";
import React from "react";
import Button from "../_components/Button";
import { motion } from "framer-motion";
import { Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Category {
  category: string;
  image: string;
}

interface CategoryProps {
  drxn: boolean;
  data: Category[];
  paddingTop?: boolean;
  paddingBottom?: boolean;
}

const ListingCategory: React.FC<CategoryProps> = ({
  drxn = false,
  data,
  paddingBottom,
  paddingTop,
}) => {
  const router = useRouter();

  const handleCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/products/${data[0]?.category}`);
  };

  return (
    <section
      className={`relative max-w-screen w-full mx-auto ${
  drxn ? "bg-prdct/10" : "bg-body"
}`}
style={{
  backgroundColor:drxn ? "#1f6f6f1a" : "#0f1214/80"
}}
    >
      <div
        className={`relative w-full flex gap-6 flex-col lg:flex-row px-4 md:px-20 lg:px-30  py-10 sm:py-16
      ${drxn ? 'flex-col-reverse lg:flex-row-reverse' : 'flex-col lg:flex-row'}
        `}
       
      >
        {/* Left big card */}
        <Card className="relative w-full lg:w-1/3 h-[360px] lg:h-[582px] product-card">
          <div className="h-full w-full relative">
            <Image
              src={data?.[0]?.image ?? "/images/card1-1.jpg"}
              alt="listingcard"
              fill
              priority
              className="object-center object-fill"
            />
          </div>
          <motion.div
            initial={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-20 flex items-start justify-start p-8"
          >
            <article className={`flex flex-col gap-2 ${drxn ? 'bg-white/80' : 'bg-body/70'} p-4 h-40 lg:h-32 w-full max-w-md`}>
              <h5 className={`${drxn ? 'text-first' : 'text-head'}`}>{data?.[0]?.category}</h5>
              <Button
                type="button"
                onClick={handleCard}
                className={`bg-transparent border-2 ${drxn ? 'text-first border-first' : "text-head border-border"}
                  tracking-wide hover:border-first hover:bg-first transition-all duration-300 ease-in-out w-3/4`}
              >
                Shop Now
              </Button>
            </article>
          </motion.div>
        </Card>

        {/* Grid of other cards */}
        <div className="relative w-full lg:w-[70%] ">
          <div className="relative w-full  grid grid-cols-1 sm:grid-cols-2  gap-6">
            {data && data.length > 1
              ? data.slice(1).map((item, index) => (
                  <div
                    key={index}
                    className="relative w-full h-[280px] sm:h-[250px] md:h-[280px] product-card"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={item.image ?? "/images/card-2.jpg"}
                        alt="listingcard"
                        fill
                        priority
                        className="object-center object-fill"
                      />
                    </div>

                    <div className="absolute inset-0 z-20 bg-body/40 p-4 flex items-end justify-end">
                      <article className="flex items-center flex-col gap-2 bg-body/70 p-3 w-3/4">
                        <h5 className="text-white">{item.category}</h5>
                        <Button
                          type="button"
                          onClick={() =>
                            router.push(`/products/${item?.category}`)
                          }
                          className="bg-transparent border-2 border-border text-head tracking-wide hover:border-first hover:bg-first transition-all duration-500 ease-in-out"
                        >
                          Shop Now
                        </Button>
                      </article>
                    </div>
                  </div>
                ))
              : [...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="relative w-full h-[250px] md:h-[300px] product-card"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={"/images/card-2.jpg"}
                        alt="listingcard"
                        fill
                        priority
                        className="object-center object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-20 bg-black/20 p-4 flex items-end justify-end">
                      <article className="flex items-center flex-col gap-2 bg-black/80 p-3 w-3/4">
                        <h3 className="text-white">Nuts</h3>
                        <Button className="bg-transparent border-2 border-head text-white tracking-wide hover:border-first hover:bg-first transition-all duration-500 ease-in-out">
                          Shop Now
                        </Button>
                      </article>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingCategory;
