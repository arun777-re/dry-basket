import { dbConnect } from "@/lib/db";
import { createResponse, handleError, validateFields, withAuth } from "@/lib/middleware/response";
import Cart from "@/models/Cart";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

import { NextRequest } from "next/server";
dbConnect();



export const PATCH = withAuth(async(req:NextRequest)=>{
    try {
        const cartId = req.nextUrl.searchParams.get('cartId');
        validateFields({cartId});
        
        const cart = await Cart.findByIdAndUpdate(cartId,{
            $unset:{coupon:''}
        });

        if(!cart){
            return createResponse({
                status:400,
                success:false,
                message:'Cart does not exists'
            })
        }

        return createResponse({
            status:200,
            success:true,
            message:'Coupon Removed successfully'
        });
    } catch (error) {
        if(error instanceof Error){
            return handleError(error.message);
        }
    }
    return handleError('Unknown error occured');
})
