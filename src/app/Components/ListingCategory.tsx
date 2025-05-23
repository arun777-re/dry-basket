'use client'
import Image from "next/image";
import React from "react";
import Button from "../_components/Button";
import { motion } from "framer-motion";

interface Category {
  category: string;
  image: string;
}

interface CategoryProps {
  drxn: boolean;
  data: Category[];
}

const ListingCategory: React.FC<CategoryProps> = ({ drxn = false, data }) => {

  console.log('motion',motion)
  return (
    <section className="relative max-w-screen w-full h-screen mx-auto">
      <div
        className="px-30 relative w-full h-full flex gap-6 py-20"
        style={{ flexDirection: drxn ? "row-reverse" : "row" }}
      >
        <div className="relative w-[30%] h-full product-card">
          <div className="h-[100%] w-full relative">
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
            whileHover={{ backgroundColor: "rgba(0,0,0,0.6)"}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-full h-full z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pr-6"
          >
            <div className="w-full h-full relative flex items-start justify-start ">
              <article className="flex items-start p-8 flex-col gap-2 bg-black h-[40%] w-[100%] ">
                <h3 className="text-white">{data?.[0]?.category}</h3>
                <Button className="bg-transparent drop-shadow-black/30 drop-shadow-xl border-2 border-head text-white tracking-wide hover:border-first hover:bg-first hover:drop-shadow-xl hover:drop-shadow-black/30 transition-all duration-500 ease-in-out">
                  Shop Now
                </Button>
              </article>
            </div>
          </motion.div>
        </div>
        <div className="relative w-[70%] h-full">
          <div className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-6">
            {data && data.length > 0 ? (
              data.slice(1).map((item, index) => (
                <div
                  key={index}
                  className="relative w-full h-[100%] product-card"
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

                  <div className="absolute w-full h-full z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/30 px-6 py-6">
                    <div className="w-full h-full relative flex items-end justify-end">
                      <article className="flex items-center flex-col gap-2 bg-black h-[60%] w-[64%] p-2">
                        <h3 className="text-white">{item.category}</h3>
                        <Button className="bg-transparent drop-shadow-black/30 drop-shadow-xl border-2 border-head text-white tracking-wide hover:border-first hover:bg-first hover:drop-shadow-xl hover:drop-shadow-black/30 transition-all duration-500 ease-in-out">
                          Shop Now
                        </Button>
                      </article>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="relative w-full h-[100%] product-card"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={"/images/card-2.jpg"}
                        alt="listingcard"
                        fill
                        priority
                        className="object-center object-fill"
                      />
                    </div>

                    <div className="absolute w-full h-full z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/30 px-6 py-6">
                      <div className="w-full h-full relative flex items-end justify-end">
                        <article className="flex items-center flex-col gap-2 bg-black h-[60%] w-[64%] p-2">
                          <h3 className="text-white">Nuts</h3>
                          <Button className="bg-transparent drop-shadow-black/30 drop-shadow-xl border-2 border-head text-white tracking-wide hover:border-first hover:bg-first hover:drop-shadow-xl hover:drop-shadow-black/30 transition-all duration-500 ease-in-out">
                            Shop Now
                          </Button>
                        </article>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingCategory;
