import { ROUTES } from "@/constants/routes";
import { getRequest } from "../middleware";
import { PaginationQuery } from "@/types/response";


export const BANNERAPISFETCH = {
      getAllBannerOperation:async({query,reject}:{
        reject:(value:any)=>any,query:PaginationQuery
    })=>await getRequest({url:`${ROUTES.BANNERURLS.GETALL_BANNER}`,reject,params:query}),
}