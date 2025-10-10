import { ErrorProps, IncomingAPIResponseFormat } from "./response";


export interface InteractionOutgoingDTO {
  productId:string | string[];
  action: "view" | "purchase" | "addCart" | "addToWishlist";
  categoryId?:string;
}


export interface InteractionSlice  {
    error:ErrorProps;
    loading:boolean;
    interaction:IncomingAPIResponseFormat<null>
}