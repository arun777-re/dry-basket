import Category from "@/models/Category";
import { Model, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { verifyUserToken } from "./verifyToken";

export function validateFields(fields: Record<string, any>) {
  // create an array from object recieved using entries method and then filter to check whether fields are provide or not
  const missing = Object.entries(fields).filter(
    ([key, value]) => value === undefined || value === null || value === ""
  );

  if (missing.length > 0) {
    const missingKeys = missing.map(([key]) => key).join(",");
    return NextResponse.json(
      {
        success: false,
        message: `Provide the required fields ${missingKeys}`,
      },
      { status: 400 }
    );
  }
}

// function to send response in the same way all over website
export function createResponse({
  success,
  status,
  message,
  data,
  currentPage,
  hasNextPage,
  hasPrevPage
  
}: {
  success: boolean;
  status: number;
  message: string;
  data?: any;
  currentPage?:number,
  hasNextPage?:boolean,
  hasPrevPage?:boolean
}) {
  // assigning properties comes to a single object
  const body: Record<string, any> = { success, status, message };
  if (data !== undefined) body.data = data;
  return NextResponse.json(body,{status});
}

// function for pagination 
export async function pagination ({searchParams,model}:{searchParams:URLSearchParams,model:Model<any>}){

  const pageparams:any = searchParams.get('page')
  const limitparams:any = searchParams.get('limit')

  const page = parseInt(pageparams) || 1;
  const limit = parseInt(limitparams) || 10;

  // use safelimit 
  const safelimit = limit > 0 ? limit : 10;

  const totalPages = await model.countDocuments();

  // current page
  const currentPage = Math.min(Math.max(page,1),totalPages);

  // how many items to skip
  const skip = (currentPage - 1) * safelimit;

  return {
    limit:safelimit,
    skip,
    currentPage,
    hasNextPage:currentPage < totalPages,
    hasPrevPage : currentPage < 1, 
  }

}

// function to check whether category exists or is a leaf category means its has no parents

export const getValidLeafCategory = async(category:string)=>{
const categoryExist = await Category.findOne({name:category});
if(!categoryExist){
  throw new Error('No such category exists');
}
const isExistsInParent = await Category.exists({parent:categoryExist._id});
if(isExistsInParent){
   throw new Error('It is not a last/leaf category');
}

return categoryExist._id;
}


export const withAuth = (handler:(req:any)=>Promise<NextResponse>)=>{
return async (req:NextRequest)=>{
  const authResult = await verifyUserToken(req);
  if(authResult instanceof NextResponse) return authResult;
  return handler(req);
}

}

export const handleError = (error:any):NextResponse=>{
   if (process.env.NODE_ENV !== "production") {
      if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error("Unknown error:", error);
    }
    }
    return createResponse({
      status: 500,
      message: "Internal Server Error",
      success: false,
    });
}