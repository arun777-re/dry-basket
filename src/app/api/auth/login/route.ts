import { NextRequest } from "next/server";
import Agent from "@/models/AgentSchema";
import { dbConnect } from "@/lib/db";
import { createResponse,handleError,validateFields } from "@/lib/middleware/response";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
await dbConnect();

const secret = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;
    const adminEmail = body.email;
    // validate fields
    validateFields({ adminEmail, password });

    // check user exists with the email

    const admin = await Agent.findOne({email: adminEmail });

    if (!admin) {
      return createResponse({message:"No Admin available with this email", success:false, status:401});
    }

    const comparePass = await admin.comparePassword(password);

    if (!comparePass) {
      return createResponse({message:"Invalid credentials", success:false, status:401});
    }

    const token = jwt.sign({ id: admin._id }, secret, { expiresIn: "7d" });

    const { _id, name, email,phone,isMainAdmin} = admin;
    const response =  createResponse({message:"logged in", success:true, status:200, data:{
      _id,
      name,
      email,
      phone,isMainAdmin
    }});

    response.cookies.set('adminToken',token,{
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
   if(error instanceof Error){
    return handleError(error);
   }
   return handleError('Unknown error occured')
  }
}
