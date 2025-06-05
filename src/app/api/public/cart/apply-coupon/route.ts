import Cart from "@/models/Cart";
import { dbConnect } from "@/lib/db";
import {
  createResponse,
  handleError,
  validateFields,
  withAuth,
} from "@/lib/middleware/response";
import { NextRequest } from "next/server";
import Offer from "@/models/PromoCode";
import { ProductDocument } from "@/types/product";
dbConnect();

export const POST = withAuth(async (req: NextRequest) => {
  try {
    const cartId = req.nextUrl.searchParams.get("cartId");
    const { code } = await req.json();

    // basic validation
    validateFields({ code, cartId });

    // find cart
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return createResponse({
        success: false,
        status: 400,
        message: "Cart does not exists",
      });
    }

    // populate productId include in cart and get category
    await cart.populate("items.productId.category");
    const items = cart.items;
    const categoriesInCart = items.map((item:any) => item.productId.category);


    // find that the coupon is exists or not
    const isCoupon = await Offer.findOne({ code });
    if (!isCoupon) {
      return createResponse({
        success: false,
        status: 400,
        message: "Coupon not found",
      });
    }

    // check whether categories in offer are same as category of products included in cart
    const isApplicable = categoriesInCart.some((category:any) => isCoupon.appliesToCategories.includes(category));

    const now = Date.now();
    if (
      (new Date(isCoupon.expiresAt).getTime() < now) ||
      !isApplicable ||
      isCoupon.active === false || isCoupon.minOrderAmount !== cart.total
    ) {
      return createResponse({
        success: false,
        status: 400,
        message: "Coupon is not valid",
      });
    }
// "Agar cart me 2 categories hain aur coupon sirf ek category pe applicable hai, to kya hoga?"

// "Agar coupon active hai par value negative hai to?"

// "Agar same cart pe 2 coupons lag jayein to?" 

    //find products on which coupan is applied and then calculate finaltotal of them 
    const productwithMatchCategories = items.filter((cat:any)=> isCoupon.appliesToCategories.includes(cat.productId.category))    
    
    // find products on which coupon is not applicable
    const notApplicable = items.filter((item:ProductDocument)=> !isCoupon.appliesToCategories.includes(item.productId.category))
    // total of not applicable products
    const notApplicableTotal = notApplicable.reduce((acc,item)=>{
        const discountRate = item.variant.discount ? item.variant.discount / 100 : 0 ;
        const priceAfterDiscount = item.price *(1- discountRate);
        return acc + priceAfterDiscount * item.quantity;
    },0);
    
    // total of applicable items 
    const productwithMatchCategoriesTotal = productwithMatchCategories.reduce((acc,item)=>{
        return acc + item.productId.price * item.quantity
    },0);


    // apply coupan on applicable items 
    let finaltotal = 0;
    if (isCoupon.discountType === "flat") {
         finaltotal = productwithMatchCategoriesTotal - isCoupon.value
    } else {
     const discounted = 1 - isCoupon.value /100
     finaltotal = (productwithMatchCategoriesTotal * discounted);
    }


    cart.coupon.code = code;
    cart.finalTotal = finaltotal + notApplicableTotal;

    await cart.save();
    return createResponse({
      success: true,
      status: 200,
      message: "Coupon applied successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error);
    }
    return handleError(new Error("An unknown error occured"));
  }
});
