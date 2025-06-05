import Cart from "@/models/Cart";
import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import {
  createResponse,
  handleError,
  withAuth,
} from "@/lib/middleware/response";
dbConnect();

interface CustomReq extends NextRequest {
  user: { _id: string; email: string; firstName: string };
}

export const GET = withAuth(async (req: CustomReq) => {
  try {
    const userId = req.user._id;

    // getting cart using users id
    const cart = await Cart.findOne({ userId }).lean();

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
});
