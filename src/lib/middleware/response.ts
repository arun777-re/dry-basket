import Category from "@/models/Category";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

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
}: {
  success: boolean;
  status: number;
  message: string;
  data?: any;
}) {
  // assigning properties comes to a single object
  const body: Record<string, any> = { success, status, message };
  if (data !== undefined) body.data = data;
  return NextResponse.json(body,{status});
}

// function for pagination 
export function pagination ({totalItems,page = 1,limit}:{totalItems:number,page?:number,limit:number}){

  // use safelimit 
  const safelimit = limit > 0 ? limit : 10;

  // count totalPages based on limit provided
  const totalPages = Math.max(Math.ceil(totalItems / safelimit),1);

  // current page
  const currentPage = Math.min(Math.max(page,1),totalPages);

  // how many items to skip
  const skip = (currentPage - 1) * safelimit;

  return {
    totalPages,
    limit:safelimit,
    skip,
    currentPage,
    hasNextPage:currentPage < totalPages,
    hasPrevPage : currentPage < 1, 
  }

}

// function to check whether category exists or is a leaf category means its has no parents

export const getValidLeafCategory = async(category:string)=>{
  const path:Types.ObjectId[] = [];
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

