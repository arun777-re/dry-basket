"use client";

import React from "react";
import orderHook from "@/hooks/orderHook";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paginatedOrderResponse } from "@/redux/services/helpers/order/orderResponse";
import { OrderIncomingReqDTO } from "@/types/order";
import { PaginatedProductResponse } from "@/types/response";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

const AllOrders = () => {
  const isLoading = useSelector((state: RootState) => state.order.loading);
  const { GET_ALL_ORDERS } = orderHook();
  const router = useRouter();

  const [order, setOrder] = React.useState<
    PaginatedProductResponse<OrderIncomingReqDTO> | null | undefined
  >(paginatedOrderResponse);

  //   pagination
  const hasNextPage = !!(order && order.hasNextPage);
  const hasPrevPage = !!(order && order.hasPrevPage);
  const [page, setPage] = React.useState<number>(1);
  const limit = 10;

  //   api thunk call on every page value changes
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await GET_ALL_ORDERS({ page, limit });
      res && setOrder(res);
    })();
    return () => {
      isMounted = false;
    };
  }, [page, limit]);
  if (isLoading) return <Spinner />;
  if (!order?.data || order?.data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <p className="text-gray-600 text-center font-medium">
          No orders found / Place your first order with us
        </p>
      </div>
    );

  return (
    <TabsContent value="orders" className="px-0 ">
      <Card className="shadow-lg rounded-xl border-none">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold">
            My Orders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto px-2 sm:px-6">
          {Array.isArray(order.data) &&
          order.data.filter((i) => i._id !== "").length > 0 ? (
            order.data.map((item, key) => {
              const statusColor: Record<string, string> = {
                pending: "bg-yellow-100 text-yellow-800",
                confirmed: "bg-blue-100 text-blue-800",
                shipped: "bg-purple-100 text-purple-800",
                delivered: "bg-green-100 text-green-800",
                cancelled: "bg-red-100 text-red-800",
                returned: "bg-orange-100 text-orange-800",
              };
              const colorClass =
                statusColor[item.orderStatus.toLowerCase()] ||
                "bg-gray-100 text-gray-800";

              return (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center
          p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
                  onClick={() =>
                    router.push(`${ROUTES.COMPLETE_ORDER}?orderId=${item._id}`)
                  }
                >
                  {/* Left: Order Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 w-full">
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium break-all">
                        Order ID:{" "}
                        <span className="text-sm md:text-base font-semibold">
                          {item._id}
                        </span>
                      </span>
                      <span className="text-gray-500 text-sm mt-1">
                        Date: {new Date(item.createdAt!).toLocaleDateString()}
                      </span>
                      <span className="text-gray-500 text-sm mt-0.5">
                        Total: ₹{item.amount / 100}
                      </span>
                    </div>

                    {/* Optional: Products summary */}
                    <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
                      {item.cartItems?.slice(0, 3).map((p, i) => (
                        <span
                          key={i}
                          className="text-sm px-2 py-1 bg-gray-100 rounded-full"
                        >
                          {p.productId.productName} x {p.quantity}
                        </span>
                      ))}
                      {item.cartItems?.length > 3 && (
                        <span className="text-sm px-2 py-1 bg-gray-200 rounded-full">
                          +{item.cartItems.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Status */}
                  <p
                    className={`mt-2 sm:mt-0 px-3 py-1 rounded-full font-medium capitalize text-sm ${colorClass}`}
                  >
                    {item.orderStatus}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600 text-center font-medium">
              No orders found / Place your first order with us
            </p>
          )}
        </CardContent>
      </Card>
      {/* Pagination */}
      <Pagination
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        page={page}
        setPage={setPage}
      />
    </TabsContent>
  );
};

export default AllOrders;
