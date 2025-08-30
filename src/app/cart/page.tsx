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
  const [coupon, setCoupon] = React.useState<string>("");

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

  const guestCart:PopulatedIncomingCartDTO = useSelector((state: RootState) => state.usercart.cart.data);

  // guest user cart items total
  const guestCartItemsTotal = useSelector(selectCartTotal);

  // get total of cart using useSelector
  const total = user ? guestCart?.finalTotal : guestCartItemsTotal;


  // // function to apply coupon
  // const ApplyCoupon = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!user) {
  //     toast((t) => (
  //       <span>
  //         You can only apply coupon after login!
  //         <button
  //           className="ml-2 text-blue-500 underline cursor-pointer hover:text-first transition-all duration-300 ease-in"
  //           onClick={() => {
  //             router.push("user/auth-login");
  //             toast.dismiss(t.id);
  //           }}
  //         >
  //           Login
  //         </button>
  //       </span>
  //     ));
  //   } else {
  //     // dispatch thunk to apply coupon
  //     if (cartItems) {
  //       dispatch(
  //         applyCoupon({ code: coupon, cartId: cartItems?._id as string })
  //       )
  //         .unwrap()
  //         .then((res) => {
  //           dispatch(getCart());
  //           setCoupon("");
  //           setAppliedCouponCode(coupon);
  //           setShowDiscnt(true);
  //         })
  //         .catch((err) => {
  //           toast.error(err);
  //         });
  //     }
  //   }
  // };

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
    <div className="relative max-w-screen w-full h-auto mx-auto">
      <Navbar />
      <Banner heading="Cart" />
      <section className="w-full h-auto mx-auto relative">
        <div className="flex items-start justify-start gap-10 relative w-full h-auto px-40 py-20 ">
          <div className="relative flex flex-col items-start justify-start gap-4 w-[70%]">
            <h4>Products</h4>
            <div className="w-full flex flex-col items-center gap-2">
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
            </div>
          </div>
          <article className="w-[30%] h-auto relative flex flex-col items-start justify-start gap-6">
            <h4 className="my-0 pb-0">Order Summary</h4>
            <p className="text-head font-semibold">
              Subtotal&nbsp;:&nbsp;Rs{total}
            </p>
       
            <Button
              onClick={()=>router.push(`${ROUTES.CHECKOUT}`)}
              className="w-full rounded-full border-2 border-head hover:border-first hover:bg-first transition-all
              duration-500 ease-in-out cursor-pointer"
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
