"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import orderHook from "@/hooks/orderHook";
import { OrderIncomingReqDTO } from "@/types/order";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Spinner from "../_components/Spinner";
import OrderItems from "../_components/OrderItems";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import useInteractionHook from "@/hooks/interactionHook";

const OrderSuccessPage: React.FC = () => {
  const router = useRouter();
  const [order, setOrder] = React.useState<OrderIncomingReqDTO | null>(null);
  const { getLatestSuccessOrder } = orderHook();
  const loading = useSelector((state: RootState) => state.order.loading);

  const {getUserInteraction} = useInteractionHook()
  React.useEffect(() => {
    (async () => {
      const res = await getLatestSuccessOrder();
      res && setOrder(res);
    })();
  }, [getLatestSuccessOrder]);

  React.useEffect(() => {
    (async () => {
      if(order && order.cartItems.length> 0){
         order.cartItems.forEach((i)=> getUserInteraction({productId:i.productId._id , action:"purchase"}) )
      }
    })();
  }, [getUserInteraction,order]);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4 animate-bounce" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            🎉 Thank you! Your order has been placed successfully
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            A confirmation email has been sent to{" "}
            <span className="font-medium">{order?.userId.email}</span>
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Order Summary */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Order Summary
            </h2>
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Order ID:</span> {order?._id}
              </p>
              <p>
                <span className="font-medium">Order Date:</span>{" "}
                {order?.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : ""}
              </p>
              <p>
                <span className="font-medium">Total:</span> ₹
                {Math.max(order?.amount! / 100, 0)}
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Delivery Address
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed">
              {order?.shippingDetails.firstName}{" "}
              {order?.shippingDetails.lastName}
              <br />
              {order?.shippingDetails.address} –{" "}
              {order?.shippingDetails.pinCode}
              <br />
              📞 +91-{order?.shippingDetails.phone}
            </div>
          </div>
        </div>

        {/* Items Ordered */}
        {order?.cartItems?.length ? (
          <OrderItems cartItems={order.cartItems} />
        ) : null}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() =>
              router.push(`${ROUTES.COMPLETE_ORDER}?orderId=${order?._id}`)
            }
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition w-full sm:w-auto"
          >
            Track Your Order
          </button>
          <button
            onClick={() => router.push(`${ROUTES.ALL_PRODUCTS}`)}
            className="px-6 py-3 rounded-xl bg-gray-100 text-gray-800 font-semibold shadow hover:bg-gray-200 transition w-full sm:w-auto"
          >
            Continue Shopping
          </button>
        </div>

        {/* Support */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          Need help? Contact support at{" "}
          <span className="underline">support@drybasket.com</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
