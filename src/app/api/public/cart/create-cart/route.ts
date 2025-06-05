import { dbConnect } from "@/lib/db";
import { createResponse, handleError } from "@/lib/middleware/response";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import { cartRequestSchema } from "@/lib/validators/cartValidators";
import Cart from "@/models/Cart";
import { CartProps } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

interface CustomReq extends NextRequest {
  user?: any;
}

type CartItem = {
  productId: string;
  quantity: number;
};
export async function POST(req: CustomReq) {
  const authResult = await verifyUserToken(req);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const userId = req.user._id;
    const rawBody = await req.json();

    // yup validation
    const validatedBody = await cartRequestSchema.validate(rawBody, {
      abortEarly: false,
      stripUnknown: true,
    });
    const { coupon, items } = validatedBody as Pick<
      CartProps,
      "items" | "coupon"
    >;

    // check whether cart exists already
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = items;
      cart.coupan = coupon;
      await cart.save();
      return createResponse({
        status: 200,
        message: "Items added successfully",
        success: true,
      });
    }

    // create cart
    const newCart = await Cart.create({
      items,
      userId,
      coupon,
    });

    return createResponse({
      status: 201,
      message: "Cart Created successfully",
      success: true,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      return handleError(error);
    }
    return handleError(new Error("An unknown error occured"));
  }
}
