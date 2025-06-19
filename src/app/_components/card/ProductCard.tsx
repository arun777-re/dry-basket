"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdCart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { ProductVariant } from "@/lib/type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { addItemsToCart, createCart } from "@/redux/slices/cartSlice";

export interface ProductCardProps {
  productId: string;
  images: string[];
  productName: string;
  variants: ProductVariant[];
  slug: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  images,
  productName,
  variants,
  category,
  slug,
}) => {
  const activeRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // get user from cart
  const user = useSelector((state: RootState) => state.user.user.success);

  // creating payload for adding to cart
  const payload = {
    productId: productId,
    quantity: 1,
    categoryOfProduct: category,
    variant: {
      weight: variants?.[0].weight,
      price: variants?.[0].price,
      discount: variants?.[0].discount ?? 0,
      discountExpiry: variants?.[0].discountExpiry
        ? new Date(variants?.[0].discountExpiry)
        : null,
    },
    addedAtPrice: variants?.[0].price,
  };

  // function to add to cart

  const addToCart = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    if (user) {
      dispatch(addItemsToCart({ items: payload }));
    } else {
      dispatch(createCart({
    productId: productId,
    quantity: 1,
    image:images[0],
    productName: productName,
    categoryOfProduct: category,
    variant: {
      weight: variants?.[0].weight,
      price: variants?.[0].price,
      discount: variants?.[0].discount ?? 0,
      discountExpiry: variants?.[0].discountExpiry
        ? new Date(variants?.[0].discountExpiry)
        : null,
    },
    addedAtPrice: variants?.[0].price,
  }));
    }
  };

  return (
    <Card
      ref={activeRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="w-full  shadow-sm h-86 relative animated-border 
    "
    >
      <span className="border-left"></span>
      <span className="border-bottom"></span>
      <figure className="relative flex flex-col items-center justify-between px-4 h-86 py-8 w-full">
        <div className="relative w-full h-[50%]">
          <Image
            src={active ? images[1] : images[0]}
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
              onClick={addToCart}
              size={24}
              className="bg-white text-head  hover:text-first "
            />
            {/* <CiHeart
              size={24}
              className="bg-white text-head  hover:text-first "
            /> */}
          </div>
        </div>
        <figcaption className="flex flex-col items-center justify-center gap-3">
          <Link
            href={"#"}
            // href={`/product/${slug}`}
            className="text-2xl text-head font-normal
          hover:text-first font-rice tracking-wider transition-all duration-300 ease-in-out"
          >
            {productName}
          </Link>
          <p className="font-extrabold text-sm">Rs&nbsp;{variants[0].price}</p>
        </figcaption>
      </figure>
    </Card>
  );
};

export default ProductCard;
