import { dbConnect } from "@/lib/db";
dbConnect();

import { createResponse } from "@/lib/middleware/response";
import Category from "@/models/Category";
import { NextRequest } from "next/server";
import slugify from "slugify";
import { v4 as uuid } from "uuid";

export async function POST(req: NextRequest) {
  try {
    // getting body as json from frontend
    const body = await req.json();

    const { name, parent } = body;

    if (!name || typeof name !== "string") {
      return createResponse({
        success: false,
        status: 400,
        message: "Category Name is required",
      });
    }

    // Resolve parentId if parent name is provided
    let parentId = null;
    if (parent) {
      const parentcat = await Category.findOne({ name: parent });
      if (!parentcat) {
        return createResponse({
          success: false,
          status: 400,
          message: "Parent category not found",
        });
      }
      parentId = parentcat._id;
    }

    // Check for existing category with same name and resolved parentId
    const exists = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      parent: parentId,
    });
    if (exists) {
      return createResponse({
        success: false,
        status: 400,
        message: "Category already exists under the same parent",
      });
    }

    // generate slug for each category
    const slug = slugify(`${name}-${uuid().slice(0, 4)}`, {
      lower: true,
      strict: true,
    });

    // create category
    const category = await Category.create({
      name,
      parent: parentId,
      slug,
    });

    return createResponse({
      success: true,
      status: 201,
      message: `Category created with name: ${name}`,
      data: category,
    });
  } catch (error: any) {
    console.error(error.message);
    return createResponse({
      success: false,
      status: 500,
      message: `Error during create category: ${error.message}`,
    });
  }
}
