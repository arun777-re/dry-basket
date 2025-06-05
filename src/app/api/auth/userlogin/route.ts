import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import { createResponse, validateFields } from "@/lib/middleware/response";
import jwt from "jsonwebtoken";
import User from "@/models/User";

const secret = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    if (!body) {
       return createResponse({
                success:false,
                status:400,
                message:'Provide valid input values'
            })
    }

    const { email, password } = body;

    // validate fields
  validateFields({ email, password });

    // check user exists with the email

    const admin = await User.findOne({ email });

    if (!admin) {
      return createResponse({
                success:false,
                status:401,
                message:'No User exists with email'
            })
    }

    const comparePass = await admin.comparePassword(password);

    if (!comparePass) {
     return createResponse({
                success:false,
                status:401,
                message:'Invalid credentials'
            })
    }

    const token = jwt.sign({ id: admin._id }, secret, { expiresIn: "7d" });
    const refreshtoken = jwt.sign({id:admin._id},secret,{expiresIn:'30d'});

    const response =  createResponse({
                success:false,
                status:400,
                message:'Login Successfull'
            });
    response.cookies.set('accesstoken',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      maxAge:7 * 24 * 60 * 60,
      sameSite:'strict',
      path:"/"
    });
    response.cookies.set('refreshtoken',refreshtoken,{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      maxAge:30 * 24 * 60 * 60,
      sameSite:'strict',
      path:"/"

    })
    return response;
  } catch (error: any) {
  if(process.env.NODE_ENV === 'production'){
            console.error(error.message)
        }
           return createResponse({
                success:false,
                status:500,
                message:process.env.NODE_ENV === 'production' ? `${error.message}` : 'Internal Server Error'
            })
  }
}
