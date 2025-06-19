import { dbConnect } from "@/lib/db";

import {
  createResponse,
  handleError,
  withAuth,
} from "@/lib/middleware/response";
import { applyCouponInside } from "@/lib/services/cartService";
import {
  cartItemSchema,
} from "@/lib/validators/cartValidators";
import { Product } from "@/models";
import Cart from "@/models/Cart";
import { NextRequest } from "next/server";

dbConnect();

interface CustomReq extends NextRequest {
  user: { _id: string };
}

export const POST = withAuth(async (req: CustomReq) => {
  try {
    const userId = req.user._id;
    const rawBody = await req.json();
const {items} = rawBody;
    // yup validation
    const validatedBody = await cartItemSchema.validate(items, {
      abortEarly: false,
      stripUnknown: true,
    });

    // check whether coming productId exists or not
    const product = await Product.findById(validatedBody.productId);
    if (!product) {
      return createResponse({
        status: 400,
        message: "Product does not exists",
        success: false,
      });
    }

    // check whether cart exists already
    const cart = await Cart.findOne({ userId });
    if (cart) {
      // check whether items are already in cart or deep check for the variants means same product with different variant counts as diff item in cart
      const isExists = cart.items.find((item: any) =>
        item.productId.equals(validatedBody.productId) &&
      item.variant.weight === validatedBody.variant.weight &&
      item.variant.price === validatedBody.variant.price &&
      item.variant.discount === validatedBody.variant.discount
      );
      if (isExists) {
        // increase qty of Product
        isExists.quantity += validatedBody.quantity;
      } else {
        // add item to cart
        cart.items.push(validatedBody);
      }

      // if coupon exists then apply coupon
        await applyCouponInside(cart);

        // save cart
      await cart.save();

      return createResponse({
        status: 200,
        message: "Items added successfully",
        success: true,
        data: cart,
      });
    }

    // create cart
    const newCart = await Cart.create({
      userId,
      items: [validatedBody],
    });

    return createResponse({
      status: 201,
      message: "Cart Created successfully",
      success: true,
      data: newCart,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      return handleError(error);
    }
    return handleError(new Error("An unknown error occured"));
  }
}, true);
