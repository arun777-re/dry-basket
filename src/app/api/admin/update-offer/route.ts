import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/response";
import Offer from "@/models/PromoCode";
import { NextRequest } from "next/server";
dbConnect();

export async function PUT(req: NextRequest) {
  try {
    const offerId: any = req.nextUrl.searchParams.get("offerId");
    if (!offerId) {
      return createResponse({
        success: false,
        status: 400,
        message: "Provide offer Id",
      });
    }

    const offer = await Offer.findById(offerId);
    if (!offer) {
      return createResponse({
        success: false,
        status: 400,
        message: "Offer not exists",
      });
    }

    const body = await req.json();
    const { expiresAt, appliesToCategories, usageLimit, value } = body.body;
    let query: Record<string, any> = {};

    if (typeof expiresAt !== 'undefined') query.expiresAt = expiresAt;
    if (typeof value !== 'undefined') query.value = value;
    if (typeof appliesToCategories !== 'undefined') query.appliesToCategories = appliesToCategories;
    if (typeof usageLimit !=='undefined') query.usageLimit = usageLimit;

    console.log(body);
    const updateOffer = await Offer.findByIdAndUpdate(
      offerId,
      {
        $set: query,
      },
      { new: true }
    );

    return createResponse({
      success: true,
      status: 201,
      message: "Offer updated successfully",
      data: updateOffer,
    });
  } catch (error: any) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error.message);
    }

    return createResponse({
      success: false,
      status: 500,
      message: `${error.message}`,
    });
  }
}
