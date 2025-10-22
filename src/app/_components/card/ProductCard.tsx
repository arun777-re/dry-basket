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
import { CiHeart } from "react-icons/ci";
import useInteractionHook from "@/hooks/interactionHook";
import useWishlistHook from "@/hooks/useWhislistHook";
import ProductCardImage from "../ProductCardImage";

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  images,
  productName,
  variants,
  category,
  description,
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
  const { getUserInteraction } = useInteractionHook();
  const { createOrAddItemToWishlist } = useWishlistHook();

  // add to cart handler
  const handleAddItem = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
      e.stopPropagation();
    // stop execution when product is not in stock
    if (variants[0].stock === 0 || variants[0].stock < 0) {
      toast.error("Product is not in stock");
      return;
    }
    // preventing to add incomplete product to cart
  // Product validation
  if (
    !productId ||
    !productName ||
    !category ||
    !variants.length ||
    variants[0].weight <= 0 ||
    !images.length
  ) {
    toast.error("Product data is incomplete. Cannot add to cart.");
    return;
  }
  try {
       await Promise.all([
      addToCart({ e, payload, backendpayload }),
      getUserInteraction({ productId, action: "addCart" }),
    ]);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    toast.error("Failed to add item to cart. Please try again.");
  }
 
  };

  // add to wishlist handler
  const handleAddToWishList = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
      e.stopPropagation();
    // stop execution when product is not in stock
    if (variants[0].stock === 0 || variants[0].stock < 0) {
      toast.error("Product is not in stock");
      return;
    }
    if (!productId || !variants.length || !productName || !category || variants[0].weight <= 0 || !images.length) {
      toast.error("Product data is incomplete. Cannot add to cart.");
      return;
    }
    await Promise.all([
      createOrAddItemToWishlist({ productId }),
      getUserInteraction({ productId, action: "addToWishlist" }),
    ]);
  };

  return (
    <Card
      ref={activeRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="w-full shadow-sm h-130 sm:h-84 relative animated-border px-2 bg-white/96
    "
    >
      <span className="border-left"></span>
      <span className="border-bottom"></span>
      <figure
        className="relative flex flex-col items-center justify-between h-full py-8 w-full "
      >
        {variants[0]?.discount! > 0 &&
          new Date(variants?.[0]?.discountExpiry!).getTime() > Date.now() && (
            <span className="absolute top-2 left-0 bg-first/80 text-white px-2 py-1 text-xs rounded">
              {variants[0].discount!}% OFF
            </span>
          )}
        <div className="relative w-[100%] h-[60%] transition-all duration-300 ease-in-out overflow-hidden">
         <ProductCardImage active={active} images={images} />
          <div
            className={`absolute inset-0 flex items-center justify-center gap-6 md:${
              active ? "flex items-center justify-center gap-6" : "hidden"
            } transition-all duration-300 ease-in-out`}
          >
            <div
              onClick={handleAddItem}
              className="
    w-10 h-10 
    flex items-center justify-center
    rounded-full 
    bg-white 
    cursor-pointer 
    hover:bg-first 
    transition-all duration-300
  "
            >
              <IoMdCart size={20} className="text-head hover:text-white" />
            </div>
            <div
              onClick={handleAddToWishList}
              className="
    w-10 h-10 
    flex items-center justify-center
    rounded-full 
    bg-white 
    cursor-pointer 
    hover:bg-first 
    transition-all duration-300
  "
            >
              <CiHeart size={20} className="text-head hover:text-white" />
            </div>
          </div>
        </div>
        <figcaption className="flex flex-col items-center justify-center gap-4">
           <Link
            href={`/product/${slug}`}
            className="text-xl text-head font-normal text-center
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
