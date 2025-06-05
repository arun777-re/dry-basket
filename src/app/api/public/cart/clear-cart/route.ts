import Cart from "@/models/Cart";
import { dbConnect } from "@/lib/db";
import { NextRequest } from "next/server";
import {
  createResponse,
  handleError,
  withAuth,
} from "@/lib/middleware/response";
dbConnect();

interface CustomReq extends NextRequest {
  user: { _id: string; email: string };
}

export const DELETE = withAuth(async (req: CustomReq) => {
  try {
    const userId = req.user._id;

    const deleteCart = await Cart.findOneAndDelete({ userId });
    if (!deleteCart) {
      return createResponse({
        success: false,
        status: 400,
        message: "Cart already deleted or not found",
      });
    }

    return createResponse({
      success: true,
      status: 200,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error);
    }
    return handleError(new Error("Unknown error occured"));
  }
});
