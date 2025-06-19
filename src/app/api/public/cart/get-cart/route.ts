import { dbConnect } from "@/lib/db";
import '@/models';
import { NextRequest} from "next/server";
import {
  createResponse,
  handleError,
  withAuth,
} from "@/lib/middleware/response";
import { Cart } from "@/models";
dbConnect();

interface CustomReq extends NextRequest {
  user: { _id: string;};
}

export const GET = withAuth(async (req: CustomReq) => {
  try {
    const userId = req.user._id;

    // getting cart using users id
    const cart = await Cart.findOne({ userId })
    .populate('items.productId','productName images variants');

    if (!cart) {
      return createResponse({
        success: false,
        status: 400,
        message: "No Items in the cart",
      });
    }

    return createResponse({
      success: true,
      status: 200,
      message: "Cart retrieved successfully",
      data: cart,
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error);
    }
    return handleError(new Error("Unknown error occurred"));
  }
},true);
