import { ROUTES } from "@/constants/routes";
import { deleteRequest, getRequest, postRequest } from "../middleware";
import { SEARCHORDERQUERYDTO } from "@/types/order";

export type VerifyPaymentDTO = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
export const ORDERAPI = {
  CREATE_ORDER: async ({
    cartId,
    reject,
    data,
    weight,
  }: {
    cartId: string;
    reject: (value: any) => any;
    data: Record<string, any>;
    weight: number;
  }) =>
    await postRequest({
      url: `${ROUTES.ORDERAPI.CREATE_ORDER}?cartId=${cartId}&&weight=${weight}`,
      reject,
      data,
    }),
  VERIFY_PAYMET: async ({
    reject,
    data,
  }: {
    reject: (value: any) => any;
    data: VerifyPaymentDTO;
  }) =>
    await postRequest({
      url: `${ROUTES.ORDERAPI.VERIFY_PAYMENT}`,
      reject,
      data,
    }),
  GET_LATEST_ORDER: async (reject: (value: any) => any) =>
    await getRequest({ url: `${ROUTES.ORDERAPI.GET_LATEST_ORDER}`, reject }),
  GET_ALL_ORDERS: async ({
    reject,
    query,
  }: {
    reject: (value: any) => any;
    query: SEARCHORDERQUERYDTO;
  }) =>
    await getRequest({
      url: `${ROUTES.ORDERAPI.GET_ALL_ORDERS}`,
      reject,
      params: query,
    }),
  CANCEL_ORDER: async ({
    reject,
    orderId,
  }: {
    reject: (value: any) => any;
    orderId: string;
  }) => await deleteRequest({ url: `${ROUTES.ORDERAPI.CANCEL_ORDER}?orderId=${orderId}`,reject}),
  GET_SINGLE_ORDER: async ({
    reject,
    orderId,
  }: {
    reject: (value: any) => any;
    orderId: string;
  }) => await getRequest({ url: `${ROUTES.ORDERAPI.GET_SINGLE_ORDER_OR_TRACK_ORDER}?orderId=${orderId}`,reject}),
};
