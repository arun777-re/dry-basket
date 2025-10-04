'use client'
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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import reviewProduct from "@/hooks/reviewProduct";
import { ReviewOutgoingDTO } from "@/types/review";

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
  const productId = useSelector<RootState>(state=> state.product.singleProduct.data?._id)
  const [rating, setRating] = React.useState<number>(0);
  const [review, setReview] = React.useState<string>("");

  const {reviewAProduct,getReviewsOfProduct} = reviewProduct();
const data:ReviewOutgoingDTO = {
   rating:rating,
   reviewText:review
}
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId) return alert("Product not found!");
    if (rating === 0) return alert("Please give a rating.");
    if (review.trim().length < 5) return alert("Review is too short.");

    const data: ReviewOutgoingDTO = {
      rating,
      reviewText: review,
    };

    try {
      await reviewAProduct({ data, productId:productId as string});
      setRating(0);
      setReview("");
      await getReviewsOfProduct({productId:productId as string})
    } catch (error) {
      console.error("Review submission failed:", error);
    }
  };
   
  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
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
