"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdCart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export interface ProductCardProps {
  _id: number;
  image1: string;
  image2: string;
  title: string;
  price: string;
  slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image1,
  image2,
  title,
  price,
  slug
}) => {
  const activeRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState<boolean>(false);

  const router = useRouter();

  return (
    <Card
      ref={activeRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)} onClick={()=> router.push(`/product/${slug}`)}
      className="w-full  shadow-sm h-86 relative animated-border 
    "
    >
      <span className="border-left"></span>
      <span className="border-bottom"></span>
      <figure className="relative flex flex-col items-center justify-between px-4 h-86 py-8 w-full">
        <div className="relative w-full h-[50%]">
          <Image
            src={active ? image2 : image1}
            fill
            priority
            alt="product-image"
            className="object-cover object-center"
          />
          <div
            className={`absolute inset-0 ${
              active ? "flex items-center justify-center gap-6" : "hidden"
            } transition-all duration-300 ease-in-out`}
          >
            <IoMdCart
              size={24}
              className="bg-white text-head  hover:text-first "
            />
            <CiHeart
              size={24}
              className="bg-white text-head  hover:text-first "
            />
          </div>
        </div>

        <figcaption className="flex flex-col items-center justify-center gap-3">
          <Link
            href={"#"}
            className="text-2xl text-head font-normal
          hover:text-first font-rice tracking-wider transition-all duration-300 ease-in-out"
          >
            {title}
          </Link>
          <p className="font-extrabold text-sm">Rs&nbsp;{price}</p>
        </figcaption>
      </figure>
    </Card>
  );
};

export default ProductCard;
