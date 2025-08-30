"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  Menu,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Spinner from "@/app/_components/Spinner";
import orderHook from "@/hooks/orderHook";
import { paginatedOrderResponse } from "@/redux/services/helpers/order/orderResponse";
import { PaginatedProductResponse } from "@/types/response";
import { OrderIncomingReqDTO } from "@/types/order";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [order, setOrder] = useState<
    PaginatedProductResponse<OrderIncomingReqDTO> | null | undefined
  >(paginatedOrderResponse);

  const isLoading = useSelector((state: RootState) => state.order.loading);
  const { GET_ALL_ORDERS } = orderHook();
  const menuItems = [
    { value: "profile", label: "Profile", icon: User },
    { value: "orders", label: "Orders", icon: Package },
    { value: "addresses", label: "Addresses", icon: MapPin },
    { value: "payments", label: "Payments", icon: CreditCard },
    { value: "settings", label: "Settings", icon: Settings },
  ];

  React.useEffect(() => {
    let value = false;
    (async () => {
      await GET_ALL_ORDERS({ page: 1, limit: 10 }).then((res) => {
        setOrder(res ?? paginatedOrderResponse);
      });
    })();

    return () => {
      value = false;
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  // handle fallback
  if (order?.data!.length === 0  ) {
    return (<>
    <Spinner />
    <p>No orders found / Place your first order with us</p>
    </>)
    ;
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">My Account</h2>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-2 py-16"
        >
          <TabsList className="flex flex-col w-full gap-2">
            {menuItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="justify-start"
              >
                <item.icon className="w-4 h-4 mr-2" /> {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow flex items-center justify-between p-4 z-50">
        <h2 className="text-lg font-bold">My Account</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-white shadow-md p-4">
            <Tabs
              orientation="vertical"
              value={activeTab}
              onValueChange={(val) => {
                setActiveTab(val);
                setSidebarOpen(false);
              }}
              className="space-y-2"
            >
              <TabsList className="flex flex-col w-full gap-2">
                {menuItems.map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="justify-start"
                  >
                    <item.icon className="w-4 h-4 mr-2" /> {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 py-6 mt-14 md:mt-0">
        <Tabs value={activeTab}>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Name: Arun Jamdagni</p>
                <p>Email: arun@example.com</p>
                <Button className="mt-4">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {order && Array.isArray(order.data) &&
                  order.data?.length > 0 &&
                  order.data.map((item, key) => {
                    return (
                      <div key={key} className="border-1 border-gray-50 w-full h-auto p-4">
                        <p>order: {item._id}</p>
                        <p>order: {item.orderStatus}</p>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Home: Delhi, India</p>
                <p>Office: Gurugram, India</p>
                <Button className="mt-4">Add New Address</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Saved Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Visa - **** 1234</p>
                <p>UPI - arun@upi</p>
                <Button className="mt-4">Add Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Logout</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
