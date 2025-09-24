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
import { selectCartTotal } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import cartHook from "@/hooks/cartHook";
import { PopulatedCartItemDTO, PopulatedIncomingCartDTO } from "@/types/cart";
import { UserState } from "@/redux/slices/userSlice";

export function CartDrawer() {
  // const [guestCart, setGuestCart] = React.useState<PopulatedIncomingCartDTO>(defaultPopulatedCartResponse);

  const router = useRouter();

  //  getting if user is logged in or not
  const user = useSelector(
    (state: RootState) => (state.user as UserState).user.success
  );

  // getting cart from redux

  const guestCart: PopulatedIncomingCartDTO = useSelector(
    (state: RootState) => state.usercart.cart?.data
  );

  //this function will automatically handle dynamic cart
  const { handleCartItems } = cartHook();

  // totalPrice selector using reselct
  const totalPrice = useSelector(selectCartTotal);

  const finalCartItems = async () => {
    await handleCartItems();
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <MdAddShoppingCart
          className="text-2xl cursor-pointer"
          onClick={finalCartItems}
        />
      </DrawerTrigger>

      <DrawerContent className="ml-auto w-[24vw] sm:w-[400px] min-h-full h-auto overflow-y-scroll overflow-x-hidden bg-white shadow-lg">
        <div className="p-4 flex flex-col gap-4">
          <DialogTitle className="text-xl font-semibold">Your Cart</DialogTitle>
          {(guestCart?.items ?? []).length > 0 ? (
            guestCart?.items
              ?.filter(
                (item): item is PopulatedCartItemDTO =>
                  item.productId._id !== "string"
              )
              .map((item, key) => {
                return (
                  <DrawerCard
                    productName={
                      item?.productId?.productName?.toUpperCase() ?? ""
                    }
                    image={item.productId.images?.[0] || "/images/cart1-1.jpg"}
                    priceAfterDiscount={item.variant?.priceAfterDiscount}
                    weight={item.variant?.weight}
                    productId={item?.productId?._id}
                    quantity={item?.quantity}
                    key={key}
                  />
                );
              })
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="px-2 py-6 flex items-center justify-between border-1 border-y-gray-100 border-x-0 ">
            <p className="text-black">Total</p>
            <p className="text-black">
              Rs{user ? guestCart?.finalTotal : totalPrice}
            </p>
          </div>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push("/checkout");
              setTimeout(() => document.body.click(), 100);
            }}
          >
            Proceed to checkout
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              router.push("/cart");
              setTimeout(() => document.body.click(), 100);
            }}
          >
            View Cart
          </Button>

          <DrawerClose asChild>
            <MdCancel
              size={26}
              style={{ borderRadius: "50%" }}
              className={`absolute right-2 z-50
                              bg-head text-white transition-all rounded-full cursor-pointer hover:bg-first
                                duration-500 ease-in-out`}
            />
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
