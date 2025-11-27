"use client";
import React from "react";
import Button from "../Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { shippingSchema } from "../../validation/ordervalidation";
import OrderSummary from "../../Components/OrderSummary";
import toast from "react-hot-toast";
import shippingHook from "@/hooks/shippingHook";
import {
  cartTotalItemsWeight,
  selectCartTotal,
} from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { CartIncomingDTO } from "@/types/cart";
import orderHook from "@/hooks/orderHook";

import { IncomingAPIResponseFormat } from "@/types/response";
import { OrderIncomingReqDTO } from "@/types/order";
import { useRouter } from "next/navigation";
import { VerifyPaymentDTO } from "@/redux/services/api/order";
import cartHook from "@/hooks/cartHook";

const CheckOutForm = () => {
  const router = useRouter();
  const openRazorpayCheckout = (
    razorpayKey: string,
    razorpayOrderId: string,
    amount: number,
    currency: string,
    onSuccess: (response: any) => void,
    onFailure: (error: any) => void
  ) => {
    if (!(window as any).Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount,
      currency: currency,
      order_id: razorpayOrderId,
      name: "DryBasket",
      description: "Order Payment",
      handler: onSuccess,
      modal: {
        ondismiss: () => {
          alert("Are you Cancel");
        },
      },
      prefill: {
        // Optionally add customer info here
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const userCart = useSelector(
    (state: RootState) => state.usercart.cart.data
  ) as CartIncomingDTO | null;

  const cartTotalWeight = useSelector(cartTotalItemsWeight);
  const cartTotalAmount = useSelector(selectCartTotal);

  const [orderData, setOrderData] =
    React.useState<IncomingAPIResponseFormat<OrderIncomingReqDTO>>();
  const [lala, setLala] = React.useState<string>("");
  const [rateCalculator, setRateCalculator] = React.useState<
    IncomingAPIResponseFormat<number> | undefined
  >({
    success: false,
    message: "",
    status: 0,
    data: 0,
  });

  const { useHandleCheckout, useVerifyPayment } = orderHook();
  const { CLEAR_CART } = cartHook();
  const {
    useDebounceHook,
    SHIPPING_RATE_CALCULATOR,
    useCreateOrderForShipment,
  } = shippingHook();
  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    appartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    agreeForBlogs: false,
    agreeTosave: false,
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    if (!userCart || !userCart._id || !userCart.items) {
      toast.error("Cart ID missing. Please add items to cart.");
      setSubmitting(false);
      return;
    }

    if (!rateCalculator?.success) {
      toast.error("Shipping charges could not be fetched.");
      setSubmitting(false);
      return;
    }
    try {
      const payload = {
        shippingDetails: {
          country: "India",
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          appartment: values.appartment,
          city: values.city,
          state: values.state,
          pinCode: values.pinCode,
          phone: values.phone,
          agreeForBlogs: values.agreeForBlogs,
          agreeTosave: values.agreeTosave,
        
        },
        amount: userCart?.finalTotal,
        currency: "INR",
        shippingCharges: rateCalculator?.data,
        cartItems:userCart.items
      };
      if ((userCart && !userCart._id) || !rateCalculator?.success) {
        toast.error("Cart ID missing. Please add items to cart.");
        setSubmitting(false);
        return;
      }
      // Step 1: Call backend to create order
      const res = await useHandleCheckout({
        cartId: userCart._id as string,
        data: payload,
        weight: userCart.totalWeight ?? cartTotalWeight,
      });

      if (res?.success) {
        const { razorpayOrderId, razorpayKey, order } = res.data!;
        // Step 2: Open Razorpay popup and handle payment
        openRazorpayCheckout(
          razorpayKey,
          razorpayOrderId,
          order.amount,
          order.currency!,
          async (response) => {
            // Step 3: On payment success, verify payment with backend
            try {
              const payload: VerifyPaymentDTO = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };
              const verifyRes = await useVerifyPayment(payload);

              if (verifyRes === true) {
                await Promise.all([
                  useCreateOrderForShipment(order._id),
                  CLEAR_CART(),
                ]);
                router.push("/order-success"); // ya jahan bhej na ho success page pe
              } else {
                toast.error("Payment verification failed!");
              }
            } catch (err) {
              toast.error("Error verifying payment.");
              console.error(err);
            }
          },
          (error) => {
            toast.error("Payment failed or cancelled");
            console.error(error);
          }
        );
      } else {
        toast.error("Order creation failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative w-full min-h-full h-auto px-4 md:px-10 lg:pl-30 flex flex-col-reverse lg:flex-row items-start justify-start gap-10">
      <div className="relative flex flex-col items-start w-full lg:w-1/2 h-auto pb-10 lg:pb-0">
        <Formik
          initialValues={initialValues}
          validationSchema={shippingSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => {
            // debounce pin code live while typing
            const debouncedPin = useDebounceHook(values.pinCode, 50);
            React.useEffect(() => {
              let value = true;
              if (
                value &&
                userCart &&
                debouncedPin &&
                debouncedPin.length === 6 &&
                cartTotalWeight > 0
              ) {
                (() =>
                  SHIPPING_RATE_CALCULATOR({
                    weight: cartTotalWeight,
                    pincode: debouncedPin,
                    amount: userCart.finalTotal ?? cartTotalAmount,
                  }).then((res) => {
                    if (res) {
                      setRateCalculator(res);
                    }
                  }))();
                setLala(values.pinCode);
              }

              return () => {
                value = false;
              };
            }, [debouncedPin, cartTotalWeight]);
            return (
              <Form className="w-full flex flex-col gap-6 text-white">
                <div>
                  <label
                    htmlFor="contact"
                    className="text-base sm:text-lg lg:text-xl"
                  >
                    Contact (Phone number)
                  </label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Phone number"
                    className="w-full h-10 px-2 rounded-sm outline-2
                      text-white outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-gray-400"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="text-base sm:text-lg lg:text-xl">
                    Delivery Address
                  </label>
                  <div className="flex gap-3 mb-3">
                    <div className="flex-1">
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        className="w-full h-10 px-2 text-white rounded-sm outline-2 outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-gray-400"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        className="w-full h-10 px-2 text-white rounded-sm outline-2 outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-gray-400"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full h-10 px-2 text-white rounded-sm outline-2 outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-gray-400 mb-3"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mb-3"
                  />
                  <Field
                    type="text"
                    name="appartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full h-10 px-2 text-white rounded-sm outline-2 outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-gray-400 mb-3"
                  />
                  <div className="flex gap-3 mb-3">
                    <Field
                      type="text"
                      name="city"
                      placeholder="City"
                      className="w-1/3 h-10 px-2 text-white rounded-sm outline-2 outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-gray-400"
                    />
                    <Field
                      type="text"
                      name="state"
                      placeholder="State"
                      className="w-1/3 h-10 px-2 text-white rounded-sm outline-2 outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-gray-400"
                    />
                    <Field
                      type="text"
                      name="pinCode"
                      placeholder="Pin Code"
                      className="w-1/3 h-10 px-2 text-white rounded-sm outline-2 outline-white focus:outline-blue-700 placeholder:text-sm placeholder:text-gray-400"
                    />
                  </div>
                  <ErrorMessage
                    name="pinCode"
                    component="div"
                    className="text-red-500 text-sm mb-3"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <Field
                    type="checkbox"
                    id="agreeForBlogs"
                    name="agreeForBlogs"
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="agreeForBlogs" className="text-sm">
                    Email me with blogs
                  </label>
                </div>
                <div className="flex gap-2 items-center mb-4">
                  <Field
                    type="checkbox"
                    id="agreeTosave"
                    name="agreeTosave"
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="agreeTosave" className="text-sm">
                    Save this information for next time
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-4 border-2 border-first hover:border-blue-500
                    transition-all duration:500 ease-in-out
                    cursor-pointer bg-white text-black font-semibold"
                >
                  {isSubmitting ? (
                    <p className="text-base font-semibold tracking-wide text-blue-500">
                      Placing Order...
                    </p>
                  ) : (
                    <p className="text-base font-semibold tracking-wide">
                      Place Order
                    </p>
                  )}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <OrderSummary pincode={lala} />
    </main>
  );
};

export default CheckOutForm;
