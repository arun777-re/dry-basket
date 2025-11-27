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
  drxn?: boolean;
  data: Category[];
  paddingTop?: boolean;
  paddingBottom?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06, ease: "easeOut" as const } },
};

const cardHover = {
  hover: { scale: 1.03, y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.45)" },
};

const ListingCategory: React.FC<CategoryProps> = ({
  drxn = false,
  data = [],
  paddingBottom = true,
  paddingTop = true,
}) => {
  const router = useRouter();

  const handleCard = (slug?: string) => {
    if (!slug) return;
    router.push(`/products/${slug}`);
  };

  const first = data?.[0];
  const rest = data?.length > 1 ? data.slice(1, 5) : [];

  return (
    <section
      aria-label="Category listing"
      className={`relative w-full mx-auto max-w-screen ${paddingTop ? "pt-10 sm:pt-16" : ""} ${
        paddingBottom ? "pb-10 sm:pb-20" : ""} ${drxn ? 'bg-[#1f6f6f10]' : 'bg-[#fff]'}
      `}
      // style={{ backgroundColor: drxn ? "#1f6f6f1a" : "#0f1214" }}
    >
      <div
        className={`relative w-full flex gap-6 flex-col lg:flex-row px-4 md:px-12 lg:px-24 ${
          drxn ? "flex-col-reverse lg:flex-row-reverse" : "flex-col lg:flex-row"
        }`}
      >
        {/* LEFT: Hero Card */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="relative w-full lg:w-1/3 h-[360px] lg:h-[582px] rounded-lg overflow-hidden"
        >
          <Card asChild className="relative h-full w-full">
            <motion.div
              onClick={() => handleCard(first?.category)}
              aria-label={`Open ${first?.category ?? "category"}`}
              className="relative h-full w-full p-0 m-0 block text-left"
              whileHover={{ scale: 1.0 }}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
              <div
                className=" absolute inset-0 z-20 flex items-end justify-end p-4
                     opacity-100          
                     md:opacity-0        
                     md:hover:opacity-100  
                     transition-opacity duration-300 "
              >
                <article
                  className={`flex flex-col gap-3 p-4 rounded-md max-w-xs ${
                    drxn ? "bg-black/70" : "bg-black/70"
                  }`}
                >
                  <h5 className={`${drxn ? "text-first" : "text-head"} text-lg text-center font-semibold`}>
                    {first?.category ?? "Category"}
                  </h5>
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCard(first?.category);
                    }}
                    className={`w-36 text-sm font-semibold tracking-wide bg-transparent border-2 ${
                      drxn ? "text-first border-first" : "text-head border-border"
                    } hover:bg-first hover:text-background transition`}
                  >
                    Shop Now
                  </Button>
                </article>
              </div>

              {/* Image with subtle parallax on hover */}
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.02 }}
                transition={{ ease: "easeOut", duration: 0.6 }}
                aria-hidden
              >
                <Image
                  src={first?.image ?? "/images/card1-1.jpg"}
                  alt={first?.category ?? "category image"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-fill object-center"
                />
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>

        {/* RIGHT: Grid */}
        <motion.div
          className="relative w-full lg:w-[70%]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest && rest.length > 0
              ? rest.map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative w-full h-[280px] sm:h-[260px] md:h-[280px] rounded-lg overflow-hidden product-card"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                    whileHover="hover"
                    transition={{ duration: 0.4 }}
                    {...cardHover}
                  >
                    <button
                      onClick={() => handleCard(item.category)}
                      className="relative h-full w-full p-0 m-0 block text-left"
                      aria-label={`Open ${item.category}`}
                    >
                      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
                      <div
                        className=" absolute inset-0 z-20 flex items-end justify-end p-4
                     opacity-100          
                     md:opacity-0        
                     md:hover:opacity-100  
                     transition-opacity duration-300 "
                 
                      >
                        <article className="flex flex-col items-center justify-center gap-2 bg-black/60 p-3 rounded-md w-3/4">
                          <h5 className="text-white text-center text-sm font-semibold">{item.category}</h5>
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCard(item.category);
                            }}
                            className="bg-transparent border-2 border-border text-head text-sm tracking-wide hover:border-first hover:bg-first
                            hover:text-white transition"
                          >
                            Shop Now
                          </Button>
                        </article>
                      </div>

                      <motion.div
                        className="absolute inset-0"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Image
                          src={item.image ?? "/images/card-2.jpg"}
                          alt={item.category}
                          fill
                          priority
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-fill object-center"
                        />
                      </motion.div>
                    </button>
                  </motion.div>
                ))
              : // skeleton / placeholders (4)
                [...Array(4)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="relative w-full h-[250px] md:h-[300px] rounded-lg overflow-hidden
                     product-card bg-gradient-to-b from-black/20 to-black/10"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={"/images/card-2.jpg"}
                        alt="placeholder"
                        fill
                        priority
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-fill object-center"
                      />
                    </div>
                    <div className="absolute inset-0 z-20 p-4 flex items-end justify-end">
                      <article className="flex items-center flex-col gap-2 bg-black/80 p-3 w-3/4 rounded-md">
                        <h3 className="text-white">Nuts</h3>
                        <Button className="bg-transparent border-2 border-head text-white tracking-wide hover:border-first hover:bg-first transition">
                          Shop Now
                        </Button>
                      </article>
                    </div>
                  </motion.div>
                ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ListingCategory;
