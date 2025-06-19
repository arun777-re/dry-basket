"use client";
import React, { ChangeEvent } from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  applyCoupon,
  Cartitem,
  getCart,
  getUserDistance,
  getUserLatLong,
  mergeCart,
  selectCartTotal,
} from "@/redux/slices/cartSlice";
import DrawerCard from "../_components/card/DrawerCard";
import Button from "../_components/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PopulatedCartItem } from "@/types/cart";
import { ROUTES } from "@/constants/routes";
import { getShippingCharges } from "@/redux/services/middleware";

const CompleteCartPage: React.FC = () => {
  const [coupon, setCoupon] = React.useState<string>("");
  // const [cartItems, setCartItems] = React.useState<PopulatedCart | null>(null);
  const [guestCartItems, setGuestCartItems] = React.useState<Cartitem[]>([]);
  const [showDiscnt, setShowDiscnt] = React.useState<boolean>(false);
  const [appliedCouponCode, setAppliedCouponCode] = React.useState<string>("");
  const [pinCode,setPinCode] = React.useState<string>('');
  const [shippingCharge,setshippingCharge] = React.useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  //  getting if user is logged in or not
  const user = useSelector((state: RootState) => state.user.user.success);

  // here we use two aspects one is if user is not logged in then guest cart otherwise actual cart
  React.useEffect(() => {
    if (user) {
      dispatch(getCart())
        .unwrap()
        .then((res) => {
          if (res.success) {
            localStorage.removeItem("guestCart");
          }
        });
    }
  }, [dispatch, user]);

  const cartItems = useSelector((state: RootState) => state.usercart.cart.data);

  // guest user cart items total

  const guestCartItemsTotal = useSelector(selectCartTotal);

  // get total of cart using useSelector
  const total = user ? cartItems?.finalTotal : guestCartItemsTotal;

  React.useEffect(() => {
    if (!user) {
      const storedItems = JSON.parse(localStorage.getItem("guestCart") || "[]");
      setGuestCartItems(storedItems);
    }
  }, [user]);

  // function to apply coupon
  const ApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast((t) => (
        <span>
          You can only apply coupon after login!
          <button
            className="ml-2 text-blue-500 underline cursor-pointer hover:text-first transition-all duration-300 ease-in"
            onClick={() => {
              router.push("user/auth-login");
              toast.dismiss(t.id);
            }}
          >
            Login
          </button>
        </span>
      ));
    } else {
      // dispatch thunk to apply coupon
      if (cartItems) {
        dispatch(
          applyCoupon({ code: coupon, cartId: cartItems?._id as string })
        )
          .unwrap()
          .then((res) => {
            dispatch(getCart());
            setCoupon("");
            setAppliedCouponCode(coupon);
            setShowDiscnt(true);
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    }
  };

  // function for checkout
  const handleCheckout = () => {
    if (!user) {
      toast((t) => (
        <span>
          Before going to checkout you have to login/signup
          <button
            className="ml-2 text-blue-500 underline cursor-pointer hover:text-first transition-all duration-300 ease-in"
            onClick={() => {
              router.push(ROUTES.LOGIN);
              toast.dismiss(t.id);
            }}
          >
            Login
          </button>
        </span>
      ));
    } else {
      router.push(ROUTES.CHECKOUT);
    }
  };


  // function to get shipping charges
  const GetShippingCharges = React.useCallback(async (e: React.FormEvent) => {
  e.preventDefault();

  if (!pinCode || pinCode.toString().length !== 6) {
    toast.error("Please enter a valid pin code.");
    return;
  }

  try {
    const latLonRes = await dispatch(getUserLatLong(pinCode)).unwrap();
alert(`lat:${ROUTES.WAREHOUSE_LAT}, lon:${ROUTES.WAREHOUSE_LNG}`);
    if (latLonRes?.lat && latLonRes?.lng) {
      const distanceRes = await dispatch(
        getUserDistance({
          fromLat: ROUTES.WAREHOUSE_LAT,
          fromLong: ROUTES.WAREHOUSE_LNG,
          toLat: latLonRes.lat,
          toLong: latLonRes.lng,
        })
      ).unwrap();

      if (distanceRes) {
        const charge = await getShippingCharges(distanceRes);
        setshippingCharge(charge);
        toast.success(`Shipping charge ₹${charge} applied successfully!`);
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch shipping charges.");
  }
},[dispatch,pinCode]);

  return (
    <div className="relative max-w-screen w-full h-auto mx-auto">
      <Navbar />
      <Banner heading="Cart" />
      <section className="w-full h-auto mx-auto relative">
        <div className="flex items-start justify-start gap-10 relative w-full h-auto px-40 py-20 ">
          <div className="relative flex flex-col items-start justify-start gap-4 w-[70%]">
            <h4>Products</h4>
            <div className="w-full flex flex-col items-center gap-2">
              {user ? (
                cartItems && cartItems.items && (cartItems?.items ?? []).length > 0 ? (
                  cartItems?.items
                    ?.filter(
                      (item): item is PopulatedCartItem =>
                        typeof item.productId !== "string"
                    )
                    .map((item, key) => {
                      return (
                        <DrawerCard
                          productName={
                            item?.productId?.productName.toUpperCase() ?? ""
                          }
                          image={item?.productId?.images[0] ?? ""}
                          price={item?.productId?.variants?.[0]?.price ?? 0}
                          weight={item?.productId?.variants?.[0]?.weight ?? 0}
                          productId={item?.productId?._id ?? ""}
                          quantity={item.quantity}
                          key={key}
                        />
                      );
                    })
                ) : (
                  <h5>Add Items to Cart.</h5>
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
            </div>
          </div>
          <article className="w-[30%] h-auto relative flex flex-col items-start justify-start gap-6">
            <h4 className="my-0 pb-0">Order Summary</h4>
            <p className="text-head font-semibold">
              Subtotal&nbsp;:&nbsp;Rs{total}
            </p>
            <p
              className={`text-head font-semibold ${
                showDiscnt ? "visible" : "hidden"
              }`}
            >
              You save&nbsp;:&nbsp;Rs&nbsp;
              {cartItems?.coupon?.find((i) => i.code === appliedCouponCode)
                ?.discountAmount ?? 0}
            </p>
            <div className="relative w-full flex place-items-start">
              <form
                method="POST"
                className="relative w-full flex items-center justify-center"
                onSubmit={ApplyCoupon}
              >
                <input
                  type="text"
                  name="coupon"
                  placeholder="coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="px-3 py-3 outline-1 outline-head  focus:outline-first rounded-l-md"
                />
                <button
                  className="py-3 px-4 border-1 
                   text-body border-first rounded-r-md hover:bg-first transition-all duration-500 ease-in"
                >
                  Apply
                </button>
              </form>
            </div>
            <div className="relative w-full flex place-items-start">
              <form
                method="POST"
                className="relative w-full flex items-center justify-center"
                onSubmit={GetShippingCharges}
              >
                <input
                  type="string"
                  name="pinCode"
                  placeholder="PinCode"
                  value={pinCode}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPinCode(e.target.value)}
                  className="px-3 py-3 outline-1 outline-head  focus:outline-first rounded-l-md"
                />
                <button
                  className="py-3 px-4 border-1 
                   text-body border-first rounded-r-md hover:bg-first transition-all duration-500 ease-in"
                >
                  Apply
                </button>
              </form>
            </div>
            <Button
              onClick={handleCheckout}
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
