"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MdAddShoppingCart, MdCancel } from "react-icons/md";
import { DialogTitle } from "@/components/ui/dialog";
import DrawerCard from "../_components/card/DrawerCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import React from "react";
import { selectCartTotal, totalCartItems } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import cartHook from "@/hooks/cartHook";
import { PopulatedIncomingCartDTO } from "@/types/cart";
import { UserState } from "@/redux/slices/userSlice";

export function CartDrawer() {
  const router = useRouter();

  const user = useSelector(
    (state: RootState) => (state.user as UserState).user.success
  );

  const guestCart: PopulatedIncomingCartDTO | null = useSelector(
    (state: RootState) => state.usercart.cart?.data
  );

  const cartItemsLength:number = useSelector(totalCartItems);

  const { handleCartItems } = cartHook();
  const totalPrice = useSelector(selectCartTotal);

  const finalCartItems = async () => {
    await handleCartItems();
  };
  return (
  <Drawer direction="right">
  <DrawerTrigger asChild>
    <div 
      className="relative cursor-pointer text-head hover:text-first transition-all"
      onClick={finalCartItems}
    >
      <MdAddShoppingCart className="text-2xl" />

      {cartItemsLength > 0 && (
        <span
          className="
            absolute -top-3 -right-3
            bg-body/20 text-first border border-first
            w-5 h-5 flex items-center justify-center
            rounded-full text-[10px] font-bold
          "
        >
          {cartItemsLength}
        </span>
      )}
    </div>
  </DrawerTrigger>

  <DrawerContent
    className="
      fixed right-0 top-0 bottom-0
      flex flex-col bg-body/70 backdrop-blur-xl
      border-l border-border/50 shadow-xl
      overflow-hidden
      !w-screen  
      sm:!w-[90vw]
      md:!w-[70vw]
      lg:!w-[38vw]
      xl:!w-[28vw]
      transition-all duration-300
    "
  >
    <div className="relative flex flex-col gap-5 p-6 h-full overflow-y-auto">

      {/* TITLE */}
      <div className="flex items-center justify-between mb-2">
        <DialogTitle className="text-xl font-semibold tracking-wide text-head">
          Your Cart
        </DialogTitle>

        <DrawerClose asChild>
          <button>
            <MdCancel
              size={26}
              className="
                text-head hover:text-first
                bg-body/80 px-1 py-1 border border-border/50 rounded-full
                transition-all cursor-pointer
              "
            />
          </button>
        </DrawerClose>
      </div>

      {/* CART ITEMS */}
      {guestCart?.items && (guestCart?.items ?? []).length > 0 ? (
        guestCart?.items.map((item, key) => {
          if (
            !item.productId ||
            typeof item.productId === "string" ||
            !item.productId._id
          )
            return null;

          return (
            <DrawerCard
              key={key}
              productName={item.productId.productName?.toUpperCase() ?? ""}
              image={item.productId.images?.[0] || "/images/cart1-1.jpg"}
              priceAfterDiscount={item.variant?.priceAfterDiscount}
              weight={item.variant?.weight}
              productId={item.productId._id}
              quantity={item.quantity}
            />
          );
        })
      ) : (
        <p className="text-first text-sm">Your cart is empty.</p>
      )}

      {/* TOTAL */}
      {cartItemsLength > 0 && (
        <div className="py-4 border-y border-border/40 flex justify-between items-center">
          <p className="text-head font-medium text-base">Total</p>
          <p className="text-head font-semibold text-lg">
            ₹{user ? guestCart?.finalTotal : totalPrice}
          </p>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="flex flex-col gap-3 mt-4">

        {cartItemsLength > 0 ? (
          <>
            <Button
              className="
                w-full border border-first text-first hover:bg-first hover:text-body
                transition-all
              "
              variant="outline"
              onClick={() => {
                router.push("/checkout");
                setTimeout(() => document.body.click(), 100);
              }}
            >
              Proceed to Checkout
            </Button>

            <Button
              className="
                w-full border border-first text-first hover:bg-first hover:text-body
                transition-all
              "
              variant="outline"
              onClick={() => {
                router.push("/cart");
                setTimeout(() => document.body.click(), 100);
              }}
            >
              View Cart
            </Button>
          </>
        ) : (
          <Button
            className="
              w-full border border-first text-first hover:bg-first hover:text-body
              transition-all
            "
            variant="outline"
            onClick={() => {
              router.push("/allproducts");
              setTimeout(() => document.body.click(), 100);
            }}
          >
            Continue Shopping
          </Button>
        )}
      </div>

    </div>
  </DrawerContent>
</Drawer>

  );
}
