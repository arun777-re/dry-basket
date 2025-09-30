import { ErrorProps, IncomingAPIResponseFormat, PaginatedIncomingAPIResponseFormat } from "./response";

export interface BlogOutgoingReqDTO {
    blogImage:string;
    authorName:string;
    description:string;
    heading:string;
    tags:string[],
    title:string;
}


export interface BlogsIncomingDTO extends BlogOutgoingReqDTO{
    slug:string;
    createdAt:Date | string;
    updatedAt:Date | string;
}

export interface BlogState {
    loading:boolean;
    error:ErrorProps;
    singleBlog:IncomingAPIResponseFormat<BlogsIncomingDTO>;
    blogs:PaginatedIncomingAPIResponseFormat<BlogsIncomingDTO>;
    message:string;    
}


    