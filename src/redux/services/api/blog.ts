import { ROUTES } from "@/constants/routes";
import { getRequest} from "../middleware";
import { PaginationQuery } from "@/types/response";


export const BLOGAPISFETCH = {
    getBlogOperation:async({slug,reject}:{
        slug:string,
        reject:(value:any)=>any
    })=>await getRequest({url:`${ROUTES.BLOGSURLS.GETSINGLE_BLOG}?slug=${slug}`,reject}),
      getAllBlogOperation:async({reject,query}:{
        reject:(value:any)=>any,
        query:PaginationQuery
    })=>await getRequest({url:`${ROUTES.BLOGSURLS.GETALL_BLOG}`,reject,params:query}),
}