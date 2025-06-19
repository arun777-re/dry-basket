import { dbConnect } from "@/lib/db";
import {
  createResponse,
  handleError,
  validateFields,
} from "@/lib/middleware/response";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import Cart from "@/models/Cart";
import { CartItem } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";
dbConnect();

interface CustomReq extends NextRequest {
  user: { _id: string };
}

export async function POST(req: CustomReq) {
  const auth = await verifyUserToken(req);
  if (auth instanceof NextResponse) {
    return auth;
  }
  try {
    const userId = req.user._id;
    const { items } = await req.json();
    const guestItems: CartItem[] = items;
    if (!items && !Array.isArray(guestItems)) {
      return createResponse({
        success: false,
        status: 400,
        message: "Provide appropriate cart data",
      });
    }

    validateFields(guestItems);

    // check whether user have cart already
    let userCart = await Cart.findOne({ userId });
    // if user have not cart already case
    if (!userCart) {
      userCart = await Cart.create({
        userId: userId,
        items: guestItems,
      });
    } else {
      // if user have cart already then add new product to cart and increase quantity of cart
      guestItems.forEach((guestItem) => {
        const existingItems = userCart.items.find(
          (item: CartItem) => item.productId === guestItem.productId
        );

        if (existingItems) {
          existingItems.quantity += guestItem.quantity;
        } else {
          userCart.items.push(guestItem);
        }
      });
    }
    await userCart.save();
    return createResponse({
      status: 200,
      success: true,
      message: "Guest Cart merged successfully",
      data: userCart,
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error);
    }
    return handleError("Unknown error occured");
  }
}
