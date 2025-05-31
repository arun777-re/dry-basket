// app/api/products/route.ts (or route.js if using JS)

import Product from "@/models/Product";
import { createResponse, getValidLeafCategory, validateFields } from "@/lib/middleware/response";
import { v4 as uuid } from "uuid";
import slugify from "slugify";
import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";

export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
dbConnect();

  try {
    const body = await req.formData();

    if (!body) {
      return createResponse({
        success: false,
        status: 400,
        message: "No form data provided",
      });
    }

    // Parse form fields
    let tags,variants,images;
    const productName = body.get("productName") as string;
    const description = body.get("description") as string;
    const status = body.get("status") as string;
    const category = body.get("category") as string;
    const isFeatured = body.get("isFeatured")?.toString() === 'false';

    try{
       tags = JSON.parse(body.get("tags") as string);
    variants = JSON.parse(body.get("variants") as string);
    images = JSON.parse(body.get("images") as string); 
    }catch(err){
      return createResponse({
         success: false,
    status: 400,
    message: "Invalid JSON in tags, variants, or images.",
      })
    }
   

    console.log(body)
    // Basic validation
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

    if (!Array.isArray(images) || images.length < 2) {
      throw new Error("Provide at least 2 images of the product");
    }

    // check whether any category exits with same name and it is not a parent category
    const catId = await getValidLeafCategory(category);
   

    const slug = slugify(`${category}-${productName}-${uuid().slice(0, 8)}`, {
      lower: true,
      strict: true,
    });

    const product = await Product.create({
      productName,
      category:catId,
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
    console.error("Product creation error:", error.message);

    return createResponse({
      success: false,
      status: 500,
      message: `Product creation failed: ${error.message}`,
    });
  }
}
