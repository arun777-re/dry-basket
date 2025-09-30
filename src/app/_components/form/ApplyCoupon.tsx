"use client";
import React from "react";
import cartHook from "@/hooks/cartHook";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

type ApplyCouponProps = {
  cartItems: boolean;
};

const ApplyCoupon: React.FC<ApplyCouponProps> = ({ cartItems }) => {
  const [coupon, setCoupon] = React.useState<string>("");
  const router = useRouter();
  const { APPLY_COUPON } = cartHook();
  const user = useSelector((state: RootState) => state.user.user.success);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast((t) => (
        <span>
          You can only apply coupon after login!
          <button
            className="ml-2 text-blue-500 underline cursor-pointer hover:text-first transition-all duration-300 ease-in"
            onClick={() => {
              router.push(`${ROUTES.LOGIN}?redirect=${ROUTES.CHECKOUT}`);
              toast.dismiss(t.id);
            }}
          >
            Login
          </button>
        </span>
      ));
    } else {
      if (cartItems) {
        await APPLY_COUPON(coupon);
      }
    }
  };

  return (
    <form
      onSubmit={handleApplyCoupon}
      className="relative flex w-full max-w-md mx-auto gap-2 mt-4 flex-col sm:flex-row sm:items-center"
    >
      <input
        type="text"
        placeholder="Enter coupon code"
        className="flex-1 w-full border border-gray-300 px-3 py-3 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-first transition-all duration-300"
        name="code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3
        cursor-pointer bg-first text-white font-medium rounded-md hover:bg-first/90 hover:shadow-md transition-all duration-300 ease-in-out"
      >
        Apply
      </button>
    </form>
  );
};

export default ApplyCoupon;
