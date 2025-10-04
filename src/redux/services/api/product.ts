import { ROUTES } from "@/constants/routes";
import { getRequest } from "../middleware";
import { SearchQueryDTO } from "@/types/product";

export const PRODUCTAPI = {
  getsingleproduct: async ({
    slug,
    reject,
  }: {
    slug: string;
    reject: (value: any) => any;
  }) =>
    await getRequest({
      url: `${ROUTES.PRODUCTAPI.GET_A_PRODUCT}/${slug}`,
      reject: reject,
    }),
  getfeaturedproduct: async ({
    catname,
    reject,
    params,
  }: {
    catname: string;
    params: SearchQueryDTO;
    reject: (value: any) => any;
  }) =>
    await getRequest({
      url: `${ROUTES.PRODUCTAPI.GET_FEATURED_PRODUCTS}/${catname}`,
      reject: reject,
      params: params,
    }),
  getsearchproducts: async ({
    reject,
    params,
  }: {
    params: SearchQueryDTO;
    reject: (value: any) => any;
  }) =>
    await getRequest({
      url: `${ROUTES.PRODUCTAPI.GET_SEARCH_PRODUCTS}`,
      reject: reject,
      params,
    }),
  getrelatedproducts: async ({
    reject,
    params,
  }: {
    params: SearchQueryDTO;
    reject: (value: any) => any;
  }) =>
    await getRequest({
      url: `${ROUTES.PRODUCTAPI.GET_ALL_RELATED_PRODUCT}`,
      reject: reject,
      params,
    }),
  getrecommendedproducts: async ({
    catId,
    reject,
    params,
  }: {
    params: SearchQueryDTO;
    reject: (value: any) => any;
    catId:string
  }) =>
    await getRequest({
      url: `${ROUTES.PRODUCTAPI.GET_ALL_RECOMMENDED_PRODUCT}/${catId}`,
      reject: reject,
      params,
    }),
  getallcategoryproducts: async ({
    catname,
    reject,
    params,
  }: {
    params: SearchQueryDTO;
    reject: (value: any) => any;
    catname:string
  }) =>
    await getRequest({
      url: `${ROUTES.PRODUCTAPI.GET_ALL_CATEGORY_PRODUCT}/${catname}`,
      reject: reject,
      params,
    }),
  getnavsearchproducts: async ({
  
    reject,
    params,
  }: {
    params: SearchQueryDTO;
    reject: (value: any) => any;
  }) =>
    await getRequest({
      url: `${ROUTES.PRODUCTAPI.GET_NAV_SEARCH_PRODUCT}`,
      reject: reject,
      params,
    }),
  getweightofproducts: async ({
    reject,
  }: {
    reject: (value: any) => any;
  }) =>
    await getRequest({
      url: `${ROUTES.PRODUCTAPI.GET_WEIGHT_OF_PRODUCTS}`,
      reject: reject,
    }),
};
