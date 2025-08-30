"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import orderHook from "@/hooks/orderHook";
import { OrderIncomingReqDTO } from "@/types/order";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Spinner from "../_components/Spinner";
const OrderSuccessPage: React.FC = () => {
  const [order, setOrder] = React.useState<OrderIncomingReqDTO | null>();     
  const { getLatestSuccessOrder } = orderHook();
  const loading = useSelector((state:RootState)=> state.order.loading);

  React.useEffect(() => {
    let value = true;
    (async () => {
      await getLatestSuccessOrder().then((res)=>{
   setOrder(res)
      });
     
    })();
    return () => {
      value = false;
    };
  }, [getLatestSuccessOrder]);

  if(loading){return <Spinner/>}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-8">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">
            Thank you! Your order has been placed successfully 🎉
          </h1>
          <p className="text-gray-600 mt-2">
            A confirmation email has been sent to{" "}
            <span className="font-medium">arun@example.com</span>
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 border rounded-md p-4 mb-6 ">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Order Summary
          </h2>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Order ID:</span>
              {order?._id}
            </p>
            <p>
              <span className="font-medium">Order Date:</span>
              {new Date(order?.createdAt!).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Total:</span> ₹
              {Math.max(order?.amount! / 100, 0)}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Items Ordered
          </h2>
          <ul className="divide-y divide-gray-200">
            {Array.isArray(order?.cartId.items) &&
              order.cartId.items.length > 0 &&
              order.cartId.items.map((item, key) => {
                return (
                  <li className="flex justify-between py-3" key={key}>
                    <span>
                      {item.productId.productName} ({item.variant.weight}
                      &nbsp;gram) × {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.subtotal}</span>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Delivery Address */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Delivery Address
          </h2>
          <div className="text-sm text-gray-700 leading-relaxed">
            {order?.shippingDetails.firstName} {order?.shippingDetails.lastName}
            <br />
            {order?.shippingDetails.address} – {order?.shippingDetails.pinCode}{" "}
            <br />
            📞 +91-{order?.shippingDetails.phone}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition">
            Track Your Order
          </button>
          <button className="px-6 py-3 rounded-xl bg-gray-100 text-gray-800 font-semibold shadow hover:bg-gray-200 transition">
            Continue Shopping
          </button>
        </div>

        {/* Support */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Need help? Contact support at{" "}
          <span className="underline">support@drybasket.com</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
