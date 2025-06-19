import Cart from "@/models/Cart";
import { dbConnect } from "@/lib/db";
import {
  createResponse,
  handleError,
  withAuth,
} from "@/lib/middleware/response";
import { NextRequest } from "next/server";
import Offer from "@/models/PromoCode";
import { applyCoupon } from "@/lib/services/cartService";
dbConnect();

export const PATCH = withAuth(async (req: NextRequest) => {
  try {
    const cartId = req.nextUrl.searchParams.get("cartId");
    const body = await req.json();
    const { code } = body;
    // basic validation
    if (!code || !cartId) {
      return createResponse({
        success: false,
        status: 400,
        message: "Value of code/id not provided",
      });
    }

    // find cart
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return createResponse({
        success: false,
        status: 400,
        message: "Cart does not exists",
      });
    }

    // find that the coupon is exists or not
    const isCoupon = await Offer.findOne({ code });
    if (!isCoupon || isCoupon.value <= 0) {
      return createResponse({
        success: false,
        status: 400,
        message: "Coupon not found/value must be greater than 0",
      });
    }
    // check if a single coupon is not applied again
    const alreadyApplied = cart.coupon.find((c: any) => c.code === code);
    if (alreadyApplied) {
      return createResponse({
        success: false,
        status: 400,
        message: "Coupon already applied to this cart",
      });
    }

    const result = applyCoupon(isCoupon, cart.items, cart.total);
    if (!result.success) {
      return createResponse({
        success: false,
        status: 400,
        message: result.error,
      });
    }

    // update cart with final total and coupon info
    await Cart.findByIdAndUpdate(cartId, {
      $set: {
        finalTotal: result.total,
        coupon: {
          code: code,
          discountAmount: result.discountAmount,
          percentage: isCoupon.value,
        },
      },
    });

    await Offer.findByIdAndUpdate(isCoupon._id, {
      $inc: {
        timesUsed: 1,
      },
    });

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
