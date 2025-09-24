import { BlogsIncomingDTO } from "@/types/blog";
import { IncomingAPIResponseFormat, PaginatedProductResponse } from "@/types/response";

export const  blogDataResponse:BlogsIncomingDTO = {
    slug:"",
    createdAt:"",
    blogImage:"",
    authorName:"",
    description:"",
    heading:"",
    tags:[""],
    updatedAt:"",
    title:""
}

export const defaultSingleBlogResponse:IncomingAPIResponseFormat<BlogsIncomingDTO> = {
success:false,
message:"",
status:0,
data:blogDataResponse,
}
export const defaultPaginatedBlogResponse:PaginatedProductResponse<BlogsIncomingDTO> = {
success:false,
message:"",
status:0,
data:[blogDataResponse],
currentPage:1,
hasNextPage:false,
hasPrevPage:false,
}