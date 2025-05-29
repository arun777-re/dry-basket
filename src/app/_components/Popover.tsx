import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Label } from "@/components/ui/label";
import StarRating from "./StarRating";

export function PopOverCard() {
  const [open, setOpen] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-prdct px-6 py-2 rounded-none cursor-pointer text-white hover:bg-prdct/80 transition-all duration-500 ease-in-out">
            Write a Review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Review</DialogTitle>
            <DialogDescription className="text-center">
              Sincerely rate our products and share your experience with others.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-prdct px-4 py-2 text-white hover:bg-prdct/80 transition-all duration-500 ease-in-out">
          Write a Review
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Write a Review</DrawerTitle>
          <DrawerDescription>Add a Review</DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [rating, setRating] = React.useState<number>(0);
  const [review, setReview] = React.useState<string>("");
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="rating">Give Rating</Label>
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <div className="grid gap-2 py-3">
        <Label htmlFor="review">Review</Label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          id="review"
          name="review"
          rows={4}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-prdct focus:border-transparent transition-all duration-300 ease-in-out"
          placeholder="Write your review here ..."
        ></textarea>
      </div>

      <Button type="submit" className="bg-prdct hover:bg-prdct/90">Save Review</Button>
    </form>
  );
}
