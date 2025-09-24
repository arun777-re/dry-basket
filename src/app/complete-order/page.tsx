'use client'
import orderHook from '@/hooks/orderHook';
import { RootState, AppDispatch } from '@/redux/store/store';
import { Spinner, Button } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { OrderIncomingReqDTO } from '@/types/order';
import { ROUTES } from '@/constants/routes';

const CompleteOrder = () => {
  const searchParam = useSearchParams();
  const orderId = searchParam.get("orderId");
  
  const { GET_SINGLE_ORDER, CANCEL_ORDER } = orderHook();
  const router = useRouter();
 
  const {loading } = useSelector((state: RootState) => state.order);
  const [order,setOrder] = React.useState<OrderIncomingReqDTO | null>();
  React.useEffect(() => {
    if (orderId) {
      (async () => {
       const res =  await GET_SINGLE_ORDER(orderId as string)
       setOrder(res!.data)

      })();
    }
  }, [orderId]);

  const handleCancel = async () => {
    if (!orderId) return;
    try {
      const res = await CANCEL_ORDER(orderId);
      if (res && res.success) {
        toast.success("Order cancelled successfully!");
        router.push(`${ROUTES.USER_DASHBOARD}`)
      } else {
        toast.error(res!.message || "Failed to cancel order");
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
      <div className="flex justify-center items-center h-screen">
        <p>No order found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-lg border bg-white">
      {/* Order Summary */}
      <h1 className="text-xl font-semibold mb-4">Order Details</h1>
      <div className="mb-4 space-y-1">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
        <p><strong>Amount:</strong> ₹{order.amount}</p>
        <p><strong>Payment:</strong> {order.paymentType}</p>
      </div>

      {/* Cancel Button */}
      <div className="flex justify-end mb-8">
        {["PENDING", "CONFIRMED"].includes(order.orderStatus) ? (
          <Button color="red" onClick={handleCancel}>
            Cancel Order
          </Button>
        ) : (
          <p className="text-gray-500 text-sm">Order cannot be cancelled</p>
        )}
      </div>

      {/* Tracking Section */}
      <h2 className="text-lg font-semibold mb-4">Tracking History</h2>
      {order.trackingHistory && order.trackingHistory.length > 0 ? (
        <ul className="space-y-4 relative border-l-2 border-gray-300 pl-4">
          {order.trackingHistory.map((track: any, idx: number) => (
            <li key={idx} className="relative">
              <span className="absolute -left-[10px] top-1 w-4 h-4 rounded-full bg-blue-500"></span>
              <p className="font-medium">{track.status}</p>
              <p className="text-sm text-gray-500">{new Date(track.timeStamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tracking updates yet.</p>
      )}
    </div>
  );
};

export default CompleteOrder;
