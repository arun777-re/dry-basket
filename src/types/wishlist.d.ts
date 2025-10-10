import { ProductIncomingDTO } from "./product";
import { ErrorProps, PaginatedProductResponse } from "./response";



export interface WishlistOutgoingDTO {
    productId:Types.ObjectId | string;
}


export interface WishlistIncomingDTO extends WishlistIncomingDTO {
    productId:ProductIncomingDTO;
}

export interface WishSlice {
    loading:boolean;
    error:ErrorProps;
    wishlist:PaginatedProductResponse<WishlistIncomingDTO>,
    message:string;
}