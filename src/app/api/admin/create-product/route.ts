// app/api/products/route.ts (or route.js if using JS)
import { dbConnect } from "@/lib/db";

dbConnect();

import Product from "@/models/Product";
import {
  createResponse,
  getValidLeafCategory,
  validateFields,
} from "@/lib/middleware/response";
import { v4 as uuid } from "uuid";
import slugify from "slugify";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    // step 1 getting data from the form
    const body = await req.formData();
    if (!body) {
      return createResponse({
        success: false,
        status: 400,
        message: "No form data provided",
      });
    }

    // Parse form fields
    let tags, variants, images;
    const productName = body.get("productName") as string;
    const description = body.get("description") as string;
    const status = body.get("status") as string;
    const category = body.get("category") as string;
    const isFeatured = body.get("isFeatured")?.toString() === "false";

    // these fields are coming in array form
    try {
      tags = JSON.parse(body.get("tags") as string);
      variants = JSON.parse(body.get("variants") as string);
      images = JSON.parse(body.get("images") as string);
    } catch (err) {
      return createResponse({
        success: false,
        status: 400,
        message: "Invalid JSON in tags, variants, or images.",
      });
    }

    // Basic validation using function
    validateFields({
      productName,
      description,
      status,
      category,
      tags,
      variants,
      images,
      isFeatured,
    });

    // checking whether images atleast 2 and not large than 5
    if (!Array.isArray(images) || images.length < 2 || images.length > 5) {
      throw new Error("Provide at least 2 to 5 images of the product");
    }

    // check whether any category exits with same name and it is not a parent category means it is the leaf category
    const catId = await getValidLeafCategory(category);

    // generate a unique slug
    const slug = slugify(`${category}-${productName}-${uuid().slice(0, 8)}`, {
      lower: true,
      strict: true,
    });

    const product = await Product.create({
      productName,
      category: catId,
      status,
      description,
      tags,
      variants,
      images,
      isFeatured,
      slug,
    });

    return createResponse({
      success: true,
      status: 201,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Product creation error:", error.message);
    }
    return createResponse({
      success: false,
      status: 500,
      message: `Product creation failed: ${error.message}`,
    });
  }
}
