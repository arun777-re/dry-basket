import { dbConnect } from "@/lib/db";
import { withAuth } from "@/lib/middleware/response";
import { NextRequest } from "next/server";
dbConnect();



export const PATCH = withAuth(async(req:NextRequest)=>{
    try {
        const 
    } catch (error) {
        
    }
})
