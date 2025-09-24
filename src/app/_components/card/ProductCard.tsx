"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdCart } from "react-icons/io";
import { Card } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { selectCartTotal } from "@/redux/slices/cartSlice";
import { ProductCardProps } from "@/types/product";
import cartHook from "@/hooks/cartHook";
import { mapPopulatedOurgoing } from "@/lib/middleware/normalizedCart";
import toast from "react-hot-toast";

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

  const subtotal = useSelector(selectCartTotal);
  if (!productId || !variants.length) {
    console.error("Missing productId/variants for product", productName);
    return null;
  }
  // creating payload for adding to cart
  const payload = [
    {
      productId: {
        _id: productId,
        productName: productName,
        images: images,
      },
      quantity: 1,
      categoryOfProduct: category,
      variant: {
        weight: variants?.[0].weight,
        price: variants?.[0].price,
        priceAfterDiscount: variants?.[0].priceAfterDiscount,
      },
      addedAtPrice: variants?.[0].price,
      subtotal: subtotal,
    },
  ];

  // normalize cart items for backend
  const backendpayload = React.useMemo(
    () => mapPopulatedOurgoing(payload),
    [payload]
  );
  // function to add to cart
  const { addToCart } = cartHook();

  const handleAddItem = async (e: React.MouseEvent<SVGElement>) => {
    // stop execution when product is not in stock
    if (variants[0].stock === 0) {
      e.stopPropagation();
      toast.error("Product is not in stock");
      return;
    }
    await addToCart({ e, payload, backendpayload });
  };

  return (
    <Card
      ref={activeRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="w-full shadow-sm h-86 relative animated-border 
    "
    >
      <span className="border-left"></span>
      <span className="border-bottom"></span>
      <figure className="relative flex flex-col items-center justify-between px-2 h-86 py-8 w-full">
        {variants[0]?.discount! > 0 &&
          new Date(variants?.[0]?.discountExpiry!).getTime() > Date.now() && (
            <span className="absolute top-2 left-2 bg-head text-white px-2 py-1 text-xs rounded">
              {variants[0].discount!}% OFF
            </span>
          )}
        <div className="relative w-full h-[50%] ">
          <Image
            src={
              active && images[1]
                ? images[1]
                : images[0] ?? "/images/banner-1.jpg"
            }
            fill
            priority
            alt="product-image"
            className="object-contain object-center"
          />
          <div
            className={`absolute inset-0 ${
              active ? "flex items-center justify-center gap-6" : "hidden"
            } transition-all duration-300 ease-in-out`}
          >
            <IoMdCart
              onClick={handleAddItem}
              size={24}
              className="bg-transparent text-head  hover:text-first "
            />
            {/* <CiHeart
              size={24}
              className="bg-white text-head  hover:text-first "
            /> */}
          </div>
        </div>
        <figcaption className="flex flex-col items-center justify-center gap-3">
          <Link
            href={`/product/${slug}`}
            className="text-2xl text-head font-normal text-center
          hover:text-first font-rice tracking-wider transition-all duration-300 ease-in-out"
          >
            {productName}
          </Link>
          <div className="flex flex-row items-center justify-between gap-4.5">
            <p className="font-extrabold text-sm">
              Rs&nbsp;{variants[0].priceAfterDiscount}
            </p>
            {variants[0]?.discount! > 0 &&
              new Date(variants?.[0]?.discountExpiry!).getTime() >
                Date.now() && (
                <p className="text-red-500 line-through text-sm">
                  Rs&nbsp;{variants[0].price}
                </p>
              )}
          </div>
        </figcaption>
      </figure>
    </Card>
  );
};

export default ProductCard;
