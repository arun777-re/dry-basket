import { dbConnect } from "@/lib/db";
import { createResponse, handleError, pagination, withAuth } from "@/lib/middleware/response";
import Product from "@/models/Product";
import { NextRequest } from "next/server";
dbConnect();


export const GET = withAuth(async(req:NextRequest)=>{
    try {
        const {skip,limit} = await pagination({searchParams:req.nextUrl.searchParams,model:Product});

        const products =await Product.find().skip(skip).limit(limit).lean();
        if(products.length === 0){
            return createResponse({
                success:false,
                status:400,
                message:'No Products to show'
            });
        }
           return createResponse({
                success:true,
                status:200,
                message:'Fethed Products are:',
                data:products
            });
    } catch (error) {
        if(error instanceof Error){
            return handleError(error);
        }
        return handleError('Unknown error occured');
    }
},false);