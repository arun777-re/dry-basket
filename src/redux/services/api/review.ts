import { ROUTES } from "@/constants/routes";
import { getRequest, postRequest } from "../middleware";
import { ReviewOutgoingDTO } from "@/types/review";

export const REVIEWAPI = {
  createReview: async ({
    reject,
    data,
    productId
  }: {
    productId:string,
    reject: (value: any) => any, data: ReviewOutgoingDTO;
  }) => postRequest({ url: `${ROUTES.REVIEWAPI.CREATE_REVIEW}?productId=${productId}`, reject: reject,data:data }),

  getReviews: async ({
    reject,
    productId
  }: {
    productId:string,
    reject: (value: any) => any
  }) => getRequest({ url: `${ROUTES.REVIEWAPI.GET_REVIEW}?productId=${productId}`, reject: reject}),
};
