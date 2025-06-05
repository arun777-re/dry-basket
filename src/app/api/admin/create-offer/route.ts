import { dbConnect } from "@/lib/db";
import { createResponse, validateFields } from "@/lib/middleware/response";
dbConnect();
import Offer from "@/models/PromoCode";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      code,
      description,
      discountType,
      value,
      minOrderAmount,
      appliesToCategories,
      expiresAt,
      usageLimit,
    } = body;

    // handle basic validation required fields
    validateFields({
      code,
      description,
      discountType,
      value,
      expiresAt,
      usageLimit,
    });

    const offer = await Offer.create({
      code,
      description,
      discountType,
      value,
      minOrderAmount,
      appliesToCategories,
      expiresAt,
      usageLimit,
    });

    return createResponse({
      success: false,
      status: 201,
      data: offer,
      message: "Offer created successfully",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return createResponse({
        success: false,
        message: "Offer code must be unique",
        status: 400,
      });
    }
    if (error.name === "ValidationError") {
      return createResponse({
        success: false,
        status: 400,
        message: error.message,
      });
    }
    if (process.env.NODE_ENV !== "production") {
      return console.error(error.message);
    }
    return createResponse({
      success: false,
      status: 500,
      message: error.message,
    });
  }
}
