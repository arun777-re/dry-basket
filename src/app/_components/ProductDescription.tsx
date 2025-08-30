"use client";
import React, { ChangeEvent } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Button from "@/app/_components/Button";
import { ProductDescriptionDTO } from "@/types/product";
import cartHook from "@/hooks/cartHook";
import { CartItemOutgoingDTO, CommonVariantDTO } from "@/types/cart";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { mapPopulatedOurgoing } from "@/lib/middleware/normalizedCart";

const ProductDescription: React.FC<ProductDescriptionDTO> = ({
  _id,
  images,
  productName,
  description,
  avgRating,
  variants,
  category,
}) => {
  const router = useRouter();
  // state to set variants to cart dynamically
  const [variant, setVariant] = React.useState<CommonVariantDTO>({
    price: 0,
    weight: 0,
    priceAfterDiscount: 0,
  });

  React.useEffect(() => {
    if (Array.isArray(variants) && variants.length > 0) {
      setVariant(variants?.[0]);
    }
  }, [variants]);

  // state to increment and decrement quantity
  const [qty, setQty] = React.useState<number>(1);
  // state to change paragraph text on clicking thumbnail
  const [selectImage, setSelectImage] = React.useState<string>(images[0]);
  // state to set transform origin for image zoom effect
  const [transformOrigin, setTransformOrigin] = React.useState("center center");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  const handleVariants = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const selectedWeight = Number(e.target.value);
    const selectedVariant = variants?.find((v) => v.weight === selectedWeight);
    if (selectedVariant) setVariant(selectedVariant);
  };

  const { addToCart } = cartHook();
  // creating payload for adding to cart
  const payload = [
    {
      productId: {
        _id: _id,
        productName: productName,
        images: images,
      },
      quantity: qty,
      categoryOfProduct: category!,
      variant: {
        weight: variant.weight!,
        price: variant.price!,
        priceAfterDiscount: variant.priceAfterDiscount!,
      },
      addedAtPrice: variant?.price!,
      subtotal: variant?.priceAfterDiscount! * qty,
    },
  ];
  const backendpayload = React.useMemo(
    () => mapPopulatedOurgoing(payload),
    [payload]
  );
  // api call to add item to cart
  const handleAddItemToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart({ e, payload, backendpayload });
  };

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleAddItemToCart(e);
    router.push(`${ROUTES.CHECKOUT}`);
  };

  return (
    <div className=" w-full relative">
      <div className="w-full  relative flex items-start justify-center gap-8">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="w-1/2 h-[50vh] relative overflow-hidden group"
        >
          <div
            className="w-full h-full relative transition-transform duration-100 scale-100 group-hover:scale-125"
            style={{ transformOrigin }}
          >
            <Image
              src={selectImage ?? "/images/banner-2.jpg"}
              alt="product-image"
              fill
              className="object-fill object-center pointer-events-none"
            />
          </div>
        </div>

        <article className="w-1/2 h-auto relative flex flex-col items-start justify-start">
          <h2>{productName}</h2>
          <div className="flex flex-col items-start justify-center gap-1 py-4">
            <div className="flex gap-1">
              {[...Array(avgRating ?? 1)].map((_, index) => (
                <FaStar key={index} className="text-prdct text-md" />
              ))}
            </div>
            <p>{avgRating}</p>
          </div>
          <p>{description?.slice(0, 160)}...</p>

          <div className="flex items-start justify-center gap-16 py-4">
            <span className="text-sm font-semibold text-head">Price:</span>
            <span className="text-sm font-semibold text-head">
              Rs&nbsp;{variant?.priceAfterDiscount}/pc
            </span>
          </div>
          <div
            className="flex items-center 
             justify-center gap-16 py-4"
          >
            <span className="text-sm font-semibold text-head">Weight:</span>
            <select
              name="variant"
              value={variant.weight}
              onChange={handleVariants}
              className="px-4 py-1 text-body items-center
border-1 border-gray-300"
            >
              {Array.isArray(variants) &&
                variants.length > 0 &&
                variants.map((i, k) => (
                  <option
                    value={i.weight}
                    className="text-sm text-head"
                    key={k}
                  >
                    {i.weight}&nbsp;gm
                  </option>
                ))}
            </select>
          </div>
          <div
            className="flex items-center
            justify-center gap-16 py-4"
          >
            <span className="text-sm font-semibold text-head">Quantity:</span>
            <div className="flex">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1
               border-1 text-head border-gray-300"
              >
                -
              </button>
              <input
                type="text"
                className="px-1 py-1 
               border-1 w-12 text-center border-gray-300"
                value={qty}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQty(Number(e.target.value))
                }
              />
              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="px-2.5
                     py-1
                border-1 text-head border-gray-300"
              >
                +
              </button>
            </div>
          </div>
          <div
            className="flex gap-3 items-start flex-wrap
             justify-center"
          >
            {[
              { name: "Add to Cart", action: handleAddItemToCart },
              { name: "Buy it now", action: handleBuy },
              { name: "Add to Wishlist", action: () => {} },
            ].map((value, key) => (
              <Button
                key={key}
                onClick={value.action}
                className="bg-tansparent text-sm transition-all duration-500 ease-in-out
                 px-4 py-2 border-1 border-head hover:border-first hover:bg-first"
              >
                {value.name}
              </Button>
            ))}
          </div>
        </article>
      </div>
      <div className="flex items-start justify-start gap-4 flex-row w-full h-auto py-8">
        {images &&
          images.length > 0 &&
          images.map((item, key) => (
            <Button
              key={key}
              onClick={() => setSelectImage(item)}
              className="w-[80] h-[90] active:border-head rounded-none border-2 border-transparent hover:border-head transition-all duration-500 ease-in-out relative"
            >
              <Image
                src={item ?? "/images/banner-2.jpg"}
                alt="product-image-thumbnail"
                fill
                priority
                className="object-fill object-center pointer-events-none"
              />
            </Button>
          ))}
      </div>
    </div>
  );
};

export default ProductDescription;
