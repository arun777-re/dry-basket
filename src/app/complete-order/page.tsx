"use client";

import orderHook from "@/hooks/orderHook";
import { RootState } from "@/redux/store/store";
import { Spinner } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { OrderIncomingReqDTO } from "@/types/order";
import { ROUTES } from "@/constants/routes";

const CompleteOrder = () => {
  const searchParam = useSearchParams();
  const orderId = searchParam.get("orderId");

  const { GET_SINGLE_ORDER, CANCEL_ORDER } = orderHook();
  const router = useRouter();

  const { loading } = useSelector((state: RootState) => state.order);
  const [order, setOrder] = React.useState<OrderIncomingReqDTO | null>(null);

  React.useEffect(() => {
    if (orderId) {
      (async () => {
        const res = await GET_SINGLE_ORDER(orderId as string);
        setOrder(res?.data || null);
      })();
    }
  }, [orderId]);

  const handleCancel = async () => {
    if (!orderId) return;
    try {
      const res = await CANCEL_ORDER(orderId);
      if (res && res.success) {
        toast.success("Order cancelled successfully!");
        router.push(ROUTES.USER_DASHBOARD);
      } else {
        toast.error(res?.message || "Failed to cancel order");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="3" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <p className="text-gray-600">No order found.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 sm:p-10 rounded-2xl shadow-lg border bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mt-4">
          Thank you! Your order is confirmed.
        </h1>
        <p className="text-gray-600 text-sm">
          Order ID <span className="font-medium">{order._id}</span>
        </p>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 rounded-xl bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Order Details</h2>
          <p>
            <strong>Status:</strong> {order.orderStatus}
          </p>
          <p>
            <strong>Amount:</strong> ₹{order.amount/100}
          </p>
          <p>
            <strong>Payment:</strong> {order.paymentType}
          </p>
        </div>

        {/* Tracking */}
        <div className="p-4 rounded-xl bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Tracking</h2>
          {order.trackingHistory && order.trackingHistory.length > 0 ? (
            <ul className="space-y-3 max-h-48 overflow-y-auto">
              {order.trackingHistory.map((track: any, idx: number) => (
                <li key={idx} className="text-sm">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></span>
                    <div>
                      <p className="font-medium">{track.status}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(track.timeStamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No tracking updates yet.</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-xl bg-gray-100 cursor-pointer text-gray-800 font-semibold hover:bg-gray-200 transition w-full sm:w-auto"
        >
          ← Back to Home
        </button>
        <button
          onClick={() => router.push(ROUTES.ALL_PRODUCTS)}
          className="px-6 py-3 rounded-xl bg-blue-600 cursor-pointer text-white font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Continue Shopping
        </button>

        {["PENDING", "CONFIRMED"].includes(order.orderStatus) && (
          <button
            onClick={handleCancel}
            className="px-6 py-3 rounded-xl bg-red-600 cursor-pointer text-white font-semibold hover:bg-red-700 transition w-full sm:w-auto"
          >
            Cancel Order
          </button>
        )}

        <button
          onClick={() => router.push(`${ROUTES.USER_DASHBOARD}`)}
          className="px-6 py-3 rounded-xl bg-gray-100 cursor-pointer text-gray-800 font-semibold hover:bg-gray-200 transition w-full sm:w-auto"
        >
          ← Dashboard
        </button>
      </div>
    </div>
  );
};

export default CompleteOrder;
