import { createResponse, validateFields } from "@/lib/middleware/response";
import User from "@/models/User";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const secret = process.env.JWT_SECRET || '';

export async function PATCH(req:NextRequest){
    try {
        const body = await req.json();

        const {email,password} = body;

        // basic validation
        validateFields({email,password});

        // check whether any user exists with this email
        const user = await User.findOne({email:email});
        if(!user){
            return createResponse({
                success:false,
                status:401,
                message:'Account does not exists'
            })
        }
       
        // update pass
        const salt = await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(password,salt)
       const updatePass = await User.findByIdAndUpdate(user._id,{
        $set:{password:hashPass}
       });

       const accesstoken = jwt.sign({id:user._id},secret,{expiresIn:'2h'});
       const refreshtoken = jwt.sign({id:user._id},secret,{expiresIn:'30d'});
    //    sent access token and refresh token in cookies
  const response =  createResponse({
                success:true,
                status:200,
                message:'Password was updated'
            });

            response.cookies.set('accessToken',accesstoken,{
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                maxAge:2 * 60 * 60,
                path:'/',
                sameSite:'strict'
            })
            response.cookies.set('refreshToken',refreshtoken,{
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                maxAge:30 * 24 * 60 * 60 ,
                path:'/',
                sameSite:'strict'
            });
            return response;
    } catch (error:any) {
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