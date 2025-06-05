import { dbConnect } from "@/lib/db";
import { createResponse, pagination } from "@/lib/middleware/response";
import Offer from "@/models/PromoCode";
import { NextRequest } from "next/server";
dbConnect();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, skip, currentPage, hasNextPage, hasPrevPage } =
      await pagination({
        searchParams: searchParams,
        model: Offer,
      });
    const alloffers = await Offer.find().lean().skip(skip).limit(limit);
    if (alloffers.length === 0) {
      return createResponse({
        success: false,
        status: 200,
        message: "No offers available to show",
        data: [],
      });
    }
    return createResponse({
      success:true,
      status: 200,
      message: `Available offers are`,
      data: alloffers,
      currentPage,
      hasNextPage,
      hasPrevPage,
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
