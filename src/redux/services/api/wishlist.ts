import { ROUTES } from "@/constants/routes";
import {  deleteRequest, getRequest, patchRequest, postRequest } from "../middleware";
import { PaginationQuery } from "@/types/response";


export const WishListAPISFETCH = {
      createOrAddItemToUserWishlist:async({productId,reject}:{
        reject:(value:any)=>any,productId:string
    })=>await postRequest({url:`${ROUTES.WISHLISTURLS.ADD_ITEM_WISHLIST}?productId=${productId}`,reject}),
      removeItemFromUserWishlist:async({productId,reject}:{
        reject:(value:any)=>any,productId:string
    })=>await patchRequest({url:`${ROUTES.WISHLISTURLS.REMOVE_ITEM_FROM_WISHLIST}?productId=${productId}`,reject}),
      clearWishlist:async({reject}:{
        reject:(value:any)=>any
    })=>await deleteRequest({url:`${ROUTES.WISHLISTURLS.CLEAR_WISHLIST}`,reject}),
      getUserWishlist:async({query,reject}:{
        reject:(value:any)=>any,query:PaginationQuery
    })=>await getRequest({url:`${ROUTES.WISHLISTURLS.GETALL_WISHLIST}`,reject,params:query}),
}