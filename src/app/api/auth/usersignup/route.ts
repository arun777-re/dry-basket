import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import { createResponse, handleError, validateFields } from "@/lib/middleware/response";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "@/models/User";
dotenv.config();

const secret = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();

    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const phone = body.phone;
    const password = body.password;

    // handle validation
    validateFields({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    // check whether any user with email exists before
    const existingUser = await User.findOne({email});
    if(existingUser){
      return createResponse({
        success:false,
        status:400,
        message:'User already exists with this email'
      })
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    const accesstoken = jwt.sign({ id: newUser._id }, secret, {
      expiresIn: "7d",
    });
    const refreshtoken = jwt.sign({ id: newUser._id }, secret, {
      expiresIn: "30d",
    });

    const response = createResponse({message:"Admin created successfully", success:true, status:201,data: []})
    response.cookies.set({
      name: "accesstoken",
      value: accesstoken,
      httpOnly: true,
      sameSite: "strict",
      secure:process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    response.cookies.set({
      name: "refreshtoken",
      value: refreshtoken,
      httpOnly: true,
      sameSite: "strict",
      secure:process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (error: any) {
     if(error.name === 'ValidationError'){
      console.error('Validation error during save',error.message);
      return handleError(error)
     }
     throw error;
  }
}
