'use client'
import { ProductIncomingDTO } from "@/types/product";
import Image from "next/image";
import React from "react";
import { Heart, ShoppingCart,ExternalLink,Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import useWishlistHook from "@/hooks/useWhislistHook";
import cartHook from "@/hooks/cartHook";
import { mapPopulatedOurgoing } from "@/lib/middleware/normalizedCart";
import toast from "react-hot-toast";
import { ROUTES } from "@/constants/routes";
import { PaginationQuery } from "@/types/response";
import useInteractionHook from "@/hooks/interactionHook";

interface WishCardProps {
  data: ProductIncomingDTO;
  query:PaginationQuery;
}

const WishCard: React.FC<WishCardProps> = ({ data ,query}) => {
    const router = useRouter();
    const {removeItemFromWishlist,getWishlist} = useWishlistHook()
    const {addToCart} = cartHook();
    const {getUserInteraction} = useInteractionHook()

      // creating payload for adding to cart
      const payload = [
        {
          productId: {
            _id: data._id,
            productName: data.productName,
            images: data.images,
          },
          quantity: 1,
          categoryOfProduct: data.category,
          variant: {
            weight: data.variants?.[0].weight,
            price: data.variants?.[0].price,
            priceAfterDiscount: data.variants?.[0].priceAfterDiscount,
          },
          addedAtPrice: data.variants?.[0].price,
          subtotal:data.variants[0].priceAfterDiscount,
        },
      ];
    
      // normalize cart items for backend
      const backendpayload = React.useMemo(
        () => mapPopulatedOurgoing(payload),
        [payload]
      );

const handleAddToCart = async(e:React.MouseEvent<HTMLButtonElement>)=>{
e.preventDefault();
if(data._id,data.variants.length > 0){

    await Promise.all([
        addToCart({e,payload,backendpayload}),
    getUserInteraction({productId:data._id,action:"addCart"})
    ])
}else{
    toast.error("Incomplete Product Info")
}

}
const handleRemoveItemFromWishlist = async(e:React.MouseEvent<HTMLButtonElement>)=>{
e.preventDefault();
if(data._id){
   await removeItemFromWishlist({productId:data._id});
  await getWishlist({query});
}

}
const handleViewProduct = async(e:React.MouseEvent<HTMLButtonElement>)=>{
e.preventDefault();
if(data.slug){
   router.push(`${ROUTES.COMPLETE_PRODUCT}/${data.slug}`);
   await getUserInteraction({productId:data._id,action:"view"});
}
}

  return (
  <div className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-300 w-full">

  {/* Image */}
  <div className="relative w-24 h-24 sm:min-w-[90px] sm:h-[90px] rounded-lg overflow-hidden border border-gray-200">
    <Image
      src={data.images?.[0] || "/images/placeholder.jpg"}
      alt={data.productName || "wishlist-product"}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Product Info */}
  <div className="flex-1 text-center sm:text-left w-full">
    <h3 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-1">
      {data.productName}
    </h3>
    <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
      {data.description || "No description available."}
    </p>
    {data.variants && (
      <p className="text-sm sm:text-base font-semibold text-green-600 mt-2">
        ₹{data.variants[0].priceAfterDiscount.toLocaleString()}
      </p>
    )}
  </div>

  {/* Hover Action Buttons */}
  <div className="absolute top-3 right-3 flex flex-col gap-3 sm:gap-4 
  transition-opacity duration-300">
    <button
      onClick={handleRemoveItemFromWishlist}
      aria-label="Remove from wishlist"
      className="p-2 bg-white rounded-full shadow hover:bg-red-50 transition-colors"
    >
      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-red-500" />
    </button>

    <button
      onClick={handleAddToCart}
      aria-label="Add to cart"
      className="p-2 bg-white rounded-full shadow hover:bg-yellow-50 transition-colors"
    >
      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
    </button>

    <button
      onClick={handleViewProduct}
      aria-label="View Product"
      className="p-2 bg-white rounded-full shadow hover:bg-blue-50 transition-colors"
    >
      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
    </button>
  </div>
</div>

  );
};

export default WishCard;
