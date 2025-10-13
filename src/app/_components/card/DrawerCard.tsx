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
  const [active, setActive] = useState<boolean>(false);
  const [userCart, setUserCart] = React.useState<PopulatedIncomingCartDTO>(
    defaultPopulatedCartResponse
  );

  const [fallBackImage, setFallBackImage] = React.useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state?.user.user.success);
  const { REMOVE_ITEM_FROM_CART, UPDATE_ITEM_QTY } = cartHook();

  // function to remove item from cart
  const removeItem = (productId: string) => {
    if (user) {
      dispatch(removeItemOptimistic(productId));
      REMOVE_ITEM_FROM_CART({ productId, setUserCart });
    }
    dispatch(removeItemGuestCart(productId));
  };

  // function to updateqty
  const handleQuantityChange = (delta: number) => {
    if (user) {
      const payload = {
        productId,
        delta,
      };
      dispatch(updateQtyOptimistic({ productId, delta }));
      UPDATE_ITEM_QTY({ payload, setUserCart });
      setFallBackImage(image);
    } else {
      dispatch(updateQtyGuestCart({ productId, delta }));
    }
  };
  return (
    <Card
      data-aos="fade-right"
      className="w-full h-auto relative"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="w-full h-full relative p-2 shadow-xs py-4 flex items-center gap-6 justify-center border border-body/20">
        <div style={{ borderRadius: "50%" }} className="h-20 w-24 relative">
          <Image
            src={image || fallBackImage}
            fill
            alt="cart-image"
            style={{ borderRadius: "50%" }}
            className="w-full h-full object-fill object-center"
          />

          <MdCancel
            size={26}
            onClick={() => removeItem(productId)}
            // style={{ borderRadius: "50%" }}
            className={`absolute -top-8 left-0  ${
              active ? "visible" : "hidden"
            } 
                  hover:text-head  transition-all rounded-full cursor-pointer
                     duration-500 ease-in-out`}
          />
        </div>
        <article className="w-full h-auto relative flex items-start justify-start flex-col gap-2">
          <h5 className="text-body font-normal">{productName}</h5>
          <p>{weight / 1000} Kg</p>
          <p className="text-black">Rs&nbsp;{priceAfterDiscount}</p>
          <div className="relative flex items-center justify-center border-1 border-gray-200">
            <div
              onClick={() => handleQuantityChange(+1)}
              className="relative h-8 w-10 flex items-center justify-center cursor-pointer hover:bg-first transition-all duration-500 ease-in-out"
            >
              <FaPlus size={12} className="text-head hover:text-body" />
            </div>
            <div className="relative h-8 w-10 flex items-center justify-center border-1  border-x-gray-200 border-y-gray-50">
              {typeof quantity === "number" && quantity > 0 ? (
                <p>{quantity}</p>
              ) : (
                <p className="text-red-500">NA</p>
              )}
            </div>
            <div
              onClick={() => handleQuantityChange(-1)}
              className="relative h-8 w-10 flex items-center justify-center cursor-pointer hover:bg-first transition-all duration-500 ease-in-out"
            >
              <FaMinus size={12} className="text-head hover:text-body" />
            </div>
          </div>
        </article>
      </div>
    </Card>
  );
};

export default DrawerCard;
