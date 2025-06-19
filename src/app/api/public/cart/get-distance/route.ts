import { ROUTES } from "@/constants/routes";
import { createResponse } from "@/lib/middleware/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await fetch(
      "https://api.openrouteservice.org/v2/matrix/driving-car",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ROUTES.OPEN_ROUTE_API_KEY as string,
        },
        body: JSON.stringify({
          locations: [
            [body.fromLong, body.fromLat],
            [body.toLong, body.toLat],
          ],
          metrics: ["distance", "duration"],
        }),
      }
    );

    const contentType = response.headers.get("content-type");

    const text = await response.text(); // read body once safely

    if (!response.ok) {
      // Return HTML/text error as string if not JSON
      return createResponse({
        status: response.status,
        data: null,
        success: false,
        message: `Failed to fetch distance: ${text || 'No response body'}`,
      });
    }

    if (!contentType || !contentType.includes("application/json")) {
      // if response is not JSON when expected
      return createResponse({
        status: 500,
        data: null,
        success: false,
        message: `Unexpected response type: ${text}`,
      });
    }

    // parse safely
    const dataGET = JSON.parse(text);

    return createResponse({
      status: 200,
      data: dataGET,
      success: true,
      message: "Distance fetched successfully",
    });

  } catch (error: any) {
    return createResponse({
      status: 500,
      data: null,
      success: false,
      message: error.message || "Unexpected error",
    });
  }
}
