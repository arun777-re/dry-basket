"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer"; // adjust path based on your project
import { Button } from "@/components/ui/button";
import { MdAddShoppingCart, MdCancel } from "react-icons/md";
import { DialogTitle } from "@/components/ui/dialog";
import DrawerCard from "../_components/card/DrawerCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import React from "react";
import { Cartitem, getCart, selectCartTotal } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import {PopulatedCartItem } from "@/types/cart";

export function CartDrawer() {
  const [guestCartItems, setGuestCartItems] = React.useState<Cartitem[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  //  getting if user is logged in or not
  const user = useSelector((state: RootState) => state.user.user.success);

  // getting actual cart items if user is logged in
  const cartItems = useSelector((state: RootState) => state.usercart.cart.data);

 

 

  // totalPrice selector using reselct
  const totalPrice = useSelector(selectCartTotal);
  const total = user ? cartItems?.finalTotal : totalPrice;
  // function to clear cart

  // router for navigation
  console.log("cartItems", cartItems);

  // here we use two aspects one is if user is not logged in then guest cart otherwise actual cart based on event trigger

const handleCartItems = (e:React.MouseEvent<HTMLOrSVGElement>)=>{
    if (user) {
      dispatch(getCart())
        .unwrap()
        .then((res) => {
          if (res.success) {
            localStorage.removeItem("guestCart");
          }
        });
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      setGuestCartItems(guestCart);
    }
}
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <MdAddShoppingCart className="text-2xl cursor-pointer" onClick={handleCartItems}/>
      </DrawerTrigger>

      <DrawerContent className="ml-auto w-[24vw] sm:w-[400px] min-h-full h-auto overflow-y-scroll overflow-x-hidden bg-white shadow-lg">
        <div className="p-4 flex flex-col gap-4">
          <DialogTitle className="text-xl font-semibold">Your Cart</DialogTitle>
          {user === true ? (
            (cartItems?.items ?? []).length > 0 ? (
              cartItems?.items
                ?.filter(
                  (item): item is PopulatedCartItem =>
                    item.productId !== "string"
                )
                .map((item, key) => {
                  return (
                    <DrawerCard
                      productName={
                        item?.productId?.productName?.toUpperCase() ?? ""
                      }
                      image={item.productId.images?.[0] || '/images/cart1-1.jpg'}
                      price={item.productId.variants?.[0].price}
                      weight={item.productId.variants?.[0].weight}
                      productId={item?.productId?._id}
                      quantity={item?.quantity}
                      key={key}
                    />
                  );
                })
            ) : (
              <p>Your cart is empty.</p>
            )
          ) : (
            guestCartItems.map((item: Cartitem, index: number) => (
              <DrawerCard
                key={index}
                productName={item.productName}
                image={item.image ?? ""}
                price={item.variant.price}
                weight={item.variant.weight}
                productId={item.productId ?? ""}
                quantity={item.quantity}
              />
            ))
          )}
          <div className="px-2 py-6 flex items-center justify-between border-1 border-y-gray-100 border-x-0 ">
            <p className="text-black">Total</p>
            <p className="text-black">Rs{total}</p>
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
