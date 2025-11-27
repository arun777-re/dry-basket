"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Button from "@/app/_components/Button";
import { ProductDescriptionDTO } from "@/types/product";
import cartHook from "@/hooks/cartHook";
import { CommonVariantDTO } from "@/types/cart";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { mapPopulatedOurgoing } from "@/lib/middleware/normalizedCart";
import useWishlistHook from "@/hooks/useWhislistHook";
import useInteractionHook from "@/hooks/interactionHook";
import toast from "react-hot-toast";

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

  const [qty, setQty] = React.useState<number>(1);
  const [selectImage, setSelectImage] = React.useState<string>(images[0]);
  const [transformOrigin, setTransformOrigin] = React.useState("center center");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  // which variant users selects
  const handleVariants = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const selectedWeight = Number(e.target.value);
    const selectedVariant = variants?.find((v) => v.weight === selectedWeight);
    if (selectedVariant) setVariant(selectedVariant);
  };

  // hooks
  const { addToCart } = cartHook();
  const { createOrAddItemToWishlist } = useWishlistHook();
  const { getUserInteraction } = useInteractionHook();

  // making payload for adding to cart for both frontend and backend
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
  // normalizing cart items for backend
  const backendpayload = React.useMemo(
    () => mapPopulatedOurgoing(payload),
    [payload]
  );

  // add to cart handler
  const handleAddItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // stop execution when product is not in stock
    if (variants[0].stock === 0 || variants[0].stock < 0) {
      toast.error("Product is not in stock");
      return;
    }
    // preventing to add incomplete product to cart
    // Product validation
    if (
      !_id ||
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
        getUserInteraction({ productId: _id, action: "addCart" }),
      ]);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }
  };

  // buy it now handler
  const handleBuy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

      // stop execution when product is not in stock
    if (variants[0].stock === 0 || variants[0].stock < 0) {
      toast.error("Product is not in stock");
      return;
    }
        if (
      !_id ||
      !productName ||
      !category ||
      !variants.length ||
      variants[0].weight <= 0 ||
      !images.length
    ) {
      toast.error("Product data is incomplete. Cannot add to cart.");
      return;
    }
    await Promise.all([
      handleAddItem(e),
      getUserInteraction({ productId: _id, action: "purchase" }),
    ]);
    router.push(`${ROUTES.CHECKOUT}`);
  };

  // add to wishlist handler
  const handleWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
        if (
      !_id ||
      !productName ||
      !category ||
      !variants.length ||
      variants[0].weight <= 0 ||
      !images.length
    ) {
      toast.error("Product data is incomplete. Cannot add to cart.");
      return;
    }
    await Promise.all([
      createOrAddItemToWishlist({ productId: _id }),
      getUserInteraction({ productId: _id, action: "addToWishlist" }),
    ]);
  };

  return (
    <div className="w-full relative">
      {/* Main section */}
      <div className="w-full relative flex flex-col lg:flex-row items-start justify-center gap-8">
        {/* Left: Image */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[500px] relative overflow-hidden group"
        >
          <div
            className="w-full h-full relative transition-transform duration-100 scale-100 group-hover:scale-110"
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

        {/* Right: Details */}
        <article className="w-full lg:w-1/2 h-auto relative flex flex-col items-start justify-start px-2 sm:px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-head">
            {productName}
          </h2>
          <div className="flex flex-col items-start justify-center gap-1 py-4">
            <div className="flex gap-1">
              {[...Array((avgRating || avgRating === 0) ?? 1)].map(
                (_, index) => (
                  <FaStar key={index} className="text-prdct text-md" />
                )
              )}
            </div>
            <p className="text-sm text-body">
              {avgRating === 0 ? <span>No reviews yet</span> : avgRating}
            </p>
          </div>
          <p className="text-sm sm:text-base text-body">
            {description?.slice(0, 160)}...
          </p>

          <div className="flex items-center gap-4 py-4">
            <span className="text-sm font-normal text-head font-rice tracking-wide">
              Price:
            </span>
            <span className="text-base font-semibold text-head">
              Rs&nbsp;{variant?.priceAfterDiscount}/pc
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 py-2">
            <span className="text-sm font-normal text-head font-rice tracking-wide">
              Weight:
            </span>
            <select
              name="variant"
              value={variant.weight}
              onChange={handleVariants}
              className="px-2 py-1 text-sm border border-head cursor-pointer"
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

          <div className="flex flex-wrap items-center gap-4 py-2">
            <span className="text-sm font-normal text-head font-rice tracking-wide">
              Quantity:
            </span>
            <div className="flex">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="px-3 font-bold py-1 border text-head border-gray-300 cursor-pointer hover:bg-first hover:border-first transition-all duration-500 ease-in-out"
              >
                -
              </button>
              <input
                type="text"
                className="px-1 py-1 w-12 text-center border-t border-b border-gray-300"
                value={qty}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQty(Number(e.target.value))
                }
              />
              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="px-3 font-bold py-1 border text-head border-gray-300 cursor-pointer hover:bg-first hover:border-first transition-all duration-500 ease-in-out"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 py-4">
            {[
              { name: "Add to Cart", action: handleAddItem },
              { name: "Buy it now", action: handleBuy },
              { name: "Add to Wishlist", action: handleWishlist },
            ].map((value, key) => (
              <Button
                key={key}
                onClick={value.action}
                className="text-sm transition-all font-semibold duration-500 ease-in-out
                 px-4 py-2 border-2 border-head hover:border-first hover:bg-first"
              >
                {value.name}
              </Button>
            ))}
          </div>
        </article>
      </div>

      {/* Thumbnails */}
      <div className="flex flex-wrap items-center gap-4 w-full h-auto py-8">
        {images &&
          images.length > 0 &&
          images.map((item, key) => (
            <button
              key={key}
              onClick={() => setSelectImage(item)}
              className="relative w-20 h-20 border-2 border-transparent hover:border-head transition-all duration-300 ease-in-out"
            >
              <Image
                src={item ?? "/images/banner-2.jpg"}
                alt="product-image-thumbnail"
                fill
                priority
                className="object-fill object-center pointer-events-none"
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default ProductDescription;
