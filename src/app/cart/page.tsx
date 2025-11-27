"use client";
import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import {
  selectCartTotal,
} from "@/redux/slices/cartSlice";
import DrawerCard from "../_components/card/DrawerCard";
import Button from "../_components/Button";
import { useRouter } from "next/navigation";
import {  PopulatedCartItemDTO, PopulatedIncomingCartDTO } from "@/types/cart";
import { ROUTES } from "@/constants/routes";
import cartHook from "@/hooks/cartHook";

const CompleteCartPage: React.FC = () => {

  const router = useRouter();

  //  getting if user is logged in or not
  const user = useSelector((state: RootState) => state.user.user.success);
const {handleCartItems} = cartHook();
  // here we use two aspects one is if user is not logged in then guest cart otherwise actual cart
  React.useEffect(() => {
    let race = true;
     handleCartItems()
    return ()=>{
      race = false;
    }
  }, [user]);

  const guestCart:PopulatedIncomingCartDTO | null = useSelector((state: RootState) => state.usercart.cart.data);

  // guest user cart items total
  const guestCartItemsTotal = useSelector(selectCartTotal);

  // get total of cart using useSelector
  const total = user ? guestCart?.finalTotal : guestCartItemsTotal;


 

  // // function for checkout
  // const handleCheckout = () => {
  //   if (!user) {
  //     toast((t) => (
  //       <span>
  //         Before going to checkout you have to login/signup
  //         <button
  //           className="ml-2 text-blue-500 underline cursor-pointer hover:text-first transition-all duration-300 ease-in"
  //           onClick={() => {
  //             router.push(ROUTES.LOGIN);
  //             toast.dismiss(t.id);
  //           }}
  //         >
  //           Login
  //         </button>
  //       </span>
  //     ));
  //   } else {
  //     router.push(ROUTES.CHECKOUT);
  //   }
  // };


  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      <Banner heading="Cart" />

      <section className="w-full mx-auto relative">
        <div
          className="
            flex flex-col lg:flex-row gap-8 lg:gap-10 
            w-full h-auto px-4 sm:px-6 md:px-10 lg:px-20 py-8 lg:py-20
          "
        >
          {/* Products Section */}
          <div className="flex flex-col w-full lg:w-2/3">
            <h4 className=" text-lg font-semibold text-head mb-2">Products</h4>
            <div className="w-full flex flex-col gap-4">
              {(guestCart?.items ?? []).length > 0 ? (
                guestCart?.items
                  ?.filter(
                    (item): item is PopulatedCartItemDTO =>
                      item.productId._id !== "string"
                  )
                  .map((item, key) => (
                    <DrawerCard
                      key={key}
                      productName={
                        item?.productId?.productName?.toUpperCase() ?? ""
                      }
                      image={
                        item.productId.images?.[0] || "/images/cart1-1.jpg"
                      }
                      priceAfterDiscount={item.variant?.priceAfterDiscount}
                      weight={item.variant?.weight}
                      productId={item?.productId?._id}
                      quantity={item?.quantity}
                    />
                  ))
              ) : (
                <p>Your cart is empty.</p>
              )}
              <Button className="self-start border-1 border-head hover:border-first
               hover:bg-first hover:text-white transition-all duration-500 ease-in-out">
                <span onClick={() => router.push(`${ROUTES.ALL_PRODUCTS}`)}>
                  Continue Shopping
                </span>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <article className="w-full lg:w-1/3 flex flex-col gap-4 bg-gray-50 rounded-lg p-4 sm:p-6">
            <h4 className="text-lg font-semibold">Order Summary</h4>
            <p className="text-head font-medium">
              Subtotal: <span className="font-semibold">Rs{total}</span>
            </p>

            <b>Coupons and Shipping Charges applied to checkout</b>
            <Button
              onClick={() => router.push(`${ROUTES.CHECKOUT}`)}
              className="
                w-full rounded-md border border-head 
                hover:border-first hover:bg-first 
                hover:text-white transition-all duration-300 ease-in-out
              "
            >
              Proceed to Checkout
            </Button>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CompleteCartPage;
