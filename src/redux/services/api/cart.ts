import { ROUTES } from "@/constants/routes";
import { deleteRequest, getRequest, patchRequest, postRequest } from "../middleware";
import { CartItemOutgoingDTO } from "@/types/cart";

export const CARTAPI = {
  createcartoradditem: async ({
    data,
    reject,
  }: {
    reject: (value: any) => any;
    data: CartItemOutgoingDTO[];
  }) =>
    await postRequest({
      url: `${ROUTES.CARTAPI.CREATE_CART_OR_ADD_ITEM_TO_CART}`,
      reject: reject,
      data,
    }),

  getusercart: async (reject: (value: any) => any) =>
    await getRequest({ url: `${ROUTES.CARTAPI.GET_CART}`, reject }),

  updateitemquantity: async ({
    reject,
    data,
  }: {
    reject: (value: any) => any;
    data: { productId: string; delta: number };
  }) =>
    await patchRequest({ url: `${ROUTES.CARTAPI.UPDATE_QTY}`, reject, data }),

  removeitemfromcart: async ({
    reject,
    productId,
  }: {
    reject: (value: any) => any;
    productId: string;
  }) =>
    await patchRequest({
      url: `${ROUTES.CARTAPI.REMOVE_ITEM_FROM_CART}?productId=${productId}`,
      reject,
    }),
    applycoupontocart:async({
      reject,
      code
    }:{
      reject:(value:any)=>any;
      code:string
    })=>await patchRequest({url:`${ROUTES.CARTAPI.APPLY_COUPON}?code=${code}`,reject}),
    clearcart:async({reject}:{reject:(value:any)=>any})=>await deleteRequest({url:`${ROUTES.CARTAPI.DELETE_CART}`,reject})
};
