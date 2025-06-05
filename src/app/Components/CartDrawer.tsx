'use client';

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer"; // adjust path based on your project
import { Button } from "@/components/ui/button";
import { MdAddShoppingCart } from "react-icons/md";
import { DialogTitle } from "@/components/ui/dialog";

export function CartDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
                      <MdAddShoppingCart className="text-2xl cursor-pointer" />
        
      </DrawerTrigger>

      <DrawerContent
        className="ml-auto w-[30vw] sm:w-[400px] h-full bg-white shadow-lg"
      >
        <div className="p-4 flex flex-col gap-4">
            <DialogTitle className="text-xl font-semibold">Your Cart</DialogTitle>
          
          {/* Cart content goes here */}
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
