"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Package, Settings, Menu, Heart} from "lucide-react";
import AllOrders from "@/app/_components/AllOrders";
import UsewrProfile from "@/app/_components/UsewrProfile";
import Logout from "@/app/_components/Logout";
import {Home } from 'lucide-react';
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Wishlist from "@/app/Components/Wislist";

export default function UserDashboard() {
const router = useRouter()

  const [activeTab, setActiveTab] = useState<string>("profile");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const menuItems = [
    { value: "home", label: "Home", icon:Home },
    { value: "profile", label: "Profile", icon: User },
    { value: "orders", label: "Orders", icon: Package },
    { value: "wishlist", label: "Wishlist", icon:Heart },
    { value: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-normal mb-6">My Account</h2>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-2 py-12"
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

      {/* Mobile Topbar */}
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
        <div className="fixed top-16 inset-0 z-40 flex items-center justify-center max-w-screen w-full h-48 " data-aos="fade-down">
          <div className="w-full sm:w-64 h-full flex items-center bg-white shadow-md p-4 ">
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
      <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0">
        <Tabs value={activeTab}>
          {/* Example: add your Home tab content later */}
          <TabsContent value="home">
            <div className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-normal mb-2">Go to Home</h2>
              <Button onClick={()=>router.push(`${ROUTES.HOME}`)}>Home</Button>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <UsewrProfile />
          </TabsContent>

          <TabsContent value="orders">
            <AllOrders />
          </TabsContent>
          <TabsContent value="wishlist">
            <Wishlist/>
          </TabsContent>

          <TabsContent value="settings">
            <Logout />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
