// api to remove item from the cart
import { dbConnect } from "@/lib/db";
dbConnect();
import { createResponse, handleError, validateFields, withAuth } from "@/lib/middleware/response";
import { applyCoupon, applyCouponInside } from "@/lib/services/cartService";
import { Offer } from "@/models";
import Cart from "@/models/Cart";
import { CartItem, CartProps } from "@/types/cart";
import { OfferDocument } from "@/types/offer";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

interface CustomReq extends NextRequest{
    user:{_id:string}
}

export const PATCH = withAuth(async(req:CustomReq)=>{
try {
    const userId = req.user._id;

    const {productId} = await req.json();

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return createResponse({
        success: false,
        status: 400,
        message: "Either Cart is not available or malformed Cart",
      });
    }

// find cart6 associated with userId
const cart:any = await Cart.findOne({userId});
if(!cart){
    return createResponse({
        success:false,
        status:400,
        message:'Cart not found associated with userId'
    });
}

// then check whether any product with productId exists in cart items array
const productExists = cart.items.some((item:CartItem) => item.productId.toString() === productId);
  if(!productExists){
        return createResponse({
            success:false,
            status:400,
            message:"No items exists in cart with productId"
        });
    }
    // remove product from cart items array
  await Cart.updateOne({_id:cart._id},
    {$pull:{items:{productId}}});

    const updatedCart = await Cart.findById(cart._id).populate('items.productId','_id productName images variants');
   
    // if coupon exists then apply coupon
    await applyCouponInside(updatedCart as CartProps)
    await updatedCart.save();
    return createResponse({
        success:true,
        status:200,
        message:'Product removed from Cart successfully',
        data:updatedCart
    })
} catch (error) {
    if(error instanceof Error){
        return handleError(error.message)
    }
    return handleError('Unknown error occured')
}
})