import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/response";
dbConnect();
import Offer from "@/models/PromoCode";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    // get offerId from the params/url
    const offerId: any = req.nextUrl.searchParams.get("offerId");

    if (!offerId) {
      return createResponse({
        success: false,
        status: 400,
        message: "Provide an appropriate offer Id",
      });
    }

    // find offer with id and delete

    const deleteoffer = await Offer.findByIdAndDelete(offerId);

    if (!deleteoffer) {
      return createResponse({
        success: false,
        status: 400,
        message: "Offer not found or already deleted",
      });
    }

    return createResponse({
      success: true,
      status: 200,
      message: "Offer deleted successfully",
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
