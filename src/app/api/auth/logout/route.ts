import { dbConnect } from "@/lib/db";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { createResponse, handleError } from "@/lib/middleware/response";
import { cookies } from "next/headers";

dbConnect();

interface CustomNextApiRequest extends NextRequest {
  user?: any;
}

export async function POST(req: CustomNextApiRequest) {
   const authResult = await verifyUserToken(req);
   if(authResult instanceof NextResponse) return authResult;
  try {
    const user = req?.user;
    user.isActive = false;
    await user.save();
    const cookie = await cookies();
    cookie.set("accesstoken", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return createResponse({message:"Log Out Successfully", success:true, status:200, data:[]});
  } catch (error: any) {
   if(error instanceof Error){
    return handleError(error)
   }
   return handleError('Unknown error occured')
  }
}
