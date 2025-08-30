import { CartItemOutgoingDTO, PopulatedCartItemDTO } from "@/types/cart";

export function mapPopulatedOurgoing(items:PopulatedCartItemDTO[]):CartItemOutgoingDTO[]{
 return items.map(({productId,variant,quantity,categoryOfProduct,addedAtPrice})=>({
    productId:typeof productId === 'string' ? productId : productId._id,
    categoryOfProduct:categoryOfProduct,
   quantity,
   variant,
   addedAtPrice
}))
}