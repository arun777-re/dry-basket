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

  const cartItemsLength = useSelector(totalCartItems);

  const { handleCartItems } = cartHook();
  const totalPrice = useSelector(selectCartTotal);

  const finalCartItems = async () => {
    await handleCartItems();
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <div className="relative cursor-pointer" onClick={finalCartItems}>
          <MdAddShoppingCart className="text-2xl" />

          {cartItemsLength > 0 && (
            <span
              className="absolute -top-3 -right-3 bg-transparent text-first text-xs border-2 border-white
         w-4 h-4 flex items-center justify-center rounded-full font-semibold"
            >
              {cartItemsLength}
            </span>
          )}
        </div>
      </DrawerTrigger>

      {/* Responsive width classes */}
      <DrawerContent
        className="
        fixed right-0 top-0 bottom-0
        flex flex-col 
       overflow-hidden
          bg-white shadow-lg
          !w-screen           
          sm:!w-4/5             
          md:!w-2/3        
          lg:!w-1/3      
          xl:!w-[24vw]      
        "
      >
        <div className=" p-4 flex flex-col gap-4 h-full overflow-y-auto scroll-smooth relative ">
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            Cart
          </DialogTitle>

          {(guestCart?.items ?? []).length > 0 ? (
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
                  productName={
                    item?.productId?.productName?.toUpperCase() ?? ""
                  }
                  image={item.productId.images?.[0] || "/images/cart1-1.jpg"}
                  priceAfterDiscount={item.variant?.priceAfterDiscount}
                  weight={item.variant?.weight}
                  productId={item?.productId?._id}
                  quantity={item?.quantity}
                />
              );
            })
          ) : (
            <p>Your cart is empty.</p>
          )}

          <div className="px-2 py-6 flex items-center justify-between border-y border-gray-100">
            <p className="text-black">Total</p>
            <p className="text-black">
              Rs{user ? guestCart?.finalTotal : totalPrice}
            </p>
          </div>
          {guestCart && (guestCart.items ?? []).length > 0 ? (
            <>
              <Button
                className="cursor-pointer hover:bg-first"
                variant={"outline"}
                onClick={() => {
                  router.push("/checkout");
                  setTimeout(() => document.body.click(), 100);
                }}
              >
                Proceed to checkout
              </Button>
              <Button
                className="cursor-pointer hover:bg-first"
                variant={"outline"}
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
              className="cursor-pointer hover:bg-first"
              variant={"outline"}
              onClick={() => {
                router.push("/allproducts");
                setTimeout(() => document.body.click(), 100);
              }}
            >
              Continue Shopping
            </Button>
          )}

          <DrawerClose asChild>
            <MdCancel
              size={26}
              style={{ borderRadius: "50%" }}
              className={`absolute right-2 z-50 bg-head text-white transition-all rounded-full cursor-pointer hover:bg-first duration-500 ease-in-out`}
            />
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
