"use client";
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  removeItemGuestCart,
  removeItemOptimistic,
  updateQtyGuestCart,
  updateQtyOptimistic,
} from "@/redux/slices/cartSlice";
import cartHook from "@/hooks/cartHook";
import { PopulatedIncomingCartDTO } from "@/types/cart";
import { defaultPopulatedCartResponse } from "@/redux/services/helpers/cart/cartresponse";

interface DrawerCardProps {
  productId: string;
  productName: string;
  weight: number;
  priceAfterDiscount?: number;
  image: string;
  quantity: number;
}

const DrawerCard: React.FC<DrawerCardProps> = ({
  productId,
  productName,
  weight,
  priceAfterDiscount,
  image,
  quantity,
}) => {
  const [active, setActive] = useState(false);
  const [userCart, setUserCart] =
    React.useState<PopulatedIncomingCartDTO>(defaultPopulatedCartResponse);

  const [fallBackImage, setFallBackImage] = React.useState("");

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state?.user.user.success);

  const { REMOVE_ITEM_FROM_CART, UPDATE_ITEM_QTY } = cartHook();

  const removeItem = (productId: string) => {
    if (user) {
      dispatch(removeItemOptimistic(productId));
      REMOVE_ITEM_FROM_CART({ productId, setUserCart });
    }
    dispatch(removeItemGuestCart(productId));
  };

  const handleQuantityChange = (delta: number) => {
    if (user) {
      dispatch(updateQtyOptimistic({ productId, delta }));
      UPDATE_ITEM_QTY({ payload: { productId, delta }, setUserCart });
      setFallBackImage(image);
    } else {
      dispatch(updateQtyGuestCart({ productId, delta }));
    }
  };

  return (
    <Card
      className="
        w-full bg-body/60 backdrop-blur-sm 
        border border-border/60 rounded-xl 
        transition-all duration-300
      "
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="flex items-center gap-6 p-4">

        {/* IMAGE */}
        <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-border/60">
          <Image
            src={image || fallBackImage}
            fill
            loading="lazy"
            alt="cart-img"
            className="object-cover"
          />

       
        </div>

        {/* RIGHT DETAIL AREA */}
        <article className="flex-1 flex flex-col gap-1">
          <p className="font-semibold text-head tracking-wide leading-tight">
            {productName}
          </p>

          <p className="text-first text-sm">{weight / 1000} Kg</p>

          <p className="text-head font-semibold text-base">
            ₹ {priceAfterDiscount}
          </p>

          {/* CONTROLLER */}
          <div className="relative w-fit flex items-center border border-border/40 rounded-md ">

            {/* + */}
            <button
              onClick={() => handleQuantityChange(+1)}
              className="
                h-8 w-9 flex items-center justify-center 
                hover:bg-first/20 transition-all
              "
            >
              <FaPlus size={12} className="text-head" />
            </button>

            {/* QTY */}
            <div
              className="
                h-8 w-10 flex items-center justify-center 
                border-x border-border/40 text-first
              "
            >
              {quantity > 0 ? quantity : <span className="text-red-400">NA</span>}
            </div>

            {/* - */}
            <button
              onClick={() => handleQuantityChange(-1)}
              className="
                h-8 w-9 flex items-center justify-center 
                hover:bg-first/20 transition-all
              "
            >
              <FaMinus size={12} className="text-head" />
            </button>
          </div>
        </article>
           {/* DELETE ICON */}
          <MdCancel
            size={26}
            onClick={() => removeItem(productId)}
            className={`
              absolute -top-2 -left-2 text-head cursor-pointer
              transition-all duration-300
              ${active ? "opacity-100" : "opacity-0"}
              hover:text-first
            `}
          />
      </div>
    </Card>
  );
};

export default DrawerCard;
