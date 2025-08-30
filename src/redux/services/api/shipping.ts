import { ROUTES } from "@/constants/routes";
import { postRequest } from "../middleware";

export const SHIPPINGAPI = {
  getshippingcharges: async ({
    weight,
    pincode,
    reject,
  }: {
    weight: number;
    pincode: number;
    reject: (value: any) => any;
  }) =>
    postRequest({
      url: `${ROUTES.SHIPPINGAPI.GET_SHIPPING_CHARGES}`,
      reject: reject,
      data: { weight, pincode },
    }),

  createandassignordertoshipment: async ({
    reject,
    orderId
  }: {
    reject: (value: any) => any;
    orderId:string
  }) =>
    await postRequest({
      url: `${ROUTES.SHIPPINGAPI.CREATE_AND_ASSIGN_ORDER}?orderId=${orderId}`,
      reject,
    }),
};
