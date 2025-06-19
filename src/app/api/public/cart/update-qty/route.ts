import {
  createResponse,
  handleError,
  validateFields,
  withAuth,
} from "@/lib/middleware/response";
import Cart from "@/models/Cart";
import { CartItem, CartProps } from "@/types/cart";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

interface CustomReq extends NextRequest {
  user: { _id: string };
}

export const PATCH = withAuth(async (req: CustomReq) => {
  try {
    const userId = req.user._id;

    const body = await req.json();

    const { delta, productId } = body;
    
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return createResponse({
        success: false,
        status: 400,
        message: "Either Cart is not available or malformed Cart",
      });
    }
    // basic validation
    validateFields({delta});

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return createResponse({
        success: false,
        status: 400,
        message: "Cart does not exists",
      });
    }

    // check if productId comes from client side match actual productId in cart
    const isProduct = cart.items.find(
      (item: CartItem) => typeof item.productId !== 'string' && item.productId.equals(productId)
      && item.quantity + delta > 0 
    );
    if (!isProduct) {
      return createResponse({
        status: 400,
        message: "Product does not exists in Cart",
        success: false,
      });
    }

    // update quantity
    await Cart.updateOne({ _id: cart._id ,'items.productId':productId}, { $inc: {'items.$.quantity':delta} });

 const updatedCart = await Cart.findById(cart._id).populate('items.productId', '_id productName images variants');
  await updatedCart.save();

    return createResponse({
      success: true,
      message: "Quantity of Product Updated",
      status: 200,
      data: updatedCart,
    });
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error);
    }
    return handleError("unknown error occured");
  }
}, true);
