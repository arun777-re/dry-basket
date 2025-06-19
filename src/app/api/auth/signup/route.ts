import { NextResponse, NextRequest } from "next/server";
import Agent from "@/models/AgentSchema";
import { dbConnect } from "@/lib/db";
import {
  createResponse,
  handleError,
  validateFields,
} from "@/lib/middleware/response";
import InviteCode from "@/models/InviteCode";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
dbConnect();

const secret = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // validation for body
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Provide Data" },
        { status: 400 }
      );
    }

    const { name, phone, code, email, password } = body;

    // handle validation
    validateFields({
      name,
      phone,
      email,
      password,
    });

    const countDocuments = await Agent.countDocuments();

    // check if it is first admin
    if (countDocuments === 0) {
      const newAdmin = await new Agent({
        name,
        phone,
        email,
        password,
        isMainAdmin: true,
      });

      await newAdmin.save();
      const token = jwt.sign({ id: newAdmin._id }, secret, { expiresIn: "7d" });

      const response = createResponse({
        message: `Admin account created with ${name}`,
        success: true,
        status: 201,
      });
      response.cookies.set("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 60 * 60 * 24,
        path: "/",
      });

      return response;
    } else if (countDocuments >= 1 && code) {
      if (!code) {
        return createResponse({
          message: `InviteCode Required`,
          success: false,
          status: 400,
        });
      }

      //   check for code duplicasy
      const isCode = await InviteCode.findOne({ code });
      if (!isCode || isCode.isUsed) {
        return createResponse({
          message: "Used Code",
          success: false,
          status: 401,
        });
      }

      // check whether admin is existing with the same email
      const isExistingAdmin = await Agent.findOne({ email });
      if (isExistingAdmin) {
        return createResponse({
          message: "User Already exists with same email",
          success: false,
          status: 401,
        });
      }
      const newAdmin = await new Agent({
        name,
        phone,
        email,
        password,
        code: isCode._id,
      });

      await newAdmin.save();

      isCode.isUsed = true;
      await isCode.save();

      //   generate token
      const token = jwt.sign({ id: newAdmin._id }, secret, { expiresIn: "7d" });
      //   set cookie
      const response = createResponse({
        message: `Admin account created with ${name}`,
        success: true,
        status: 201,
      });
      response.cookies.set("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 60 * 60 * 24,
        path: "/",
      });
      return response;
    }

    return createResponse({
      message: "Invalid Request",
      success: false,
      status: 400,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      return handleError(error);
    }
    return handleError("Unknown error occured");
  }
}
