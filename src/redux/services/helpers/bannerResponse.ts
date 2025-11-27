import { BannerIncomingDTO } from "@/types/banner";
import {PaginatedProductResponse } from "@/types/response";

export const defaultBannerState:BannerIncomingDTO = {
bannerImage:'',
title:'' ,
description:"",
couponValue:"",
_id:''
}

export const defaultPaginatedBannerResponse:PaginatedProductResponse<BannerIncomingDTO> = {
success:false,
message:"",
status:0,
data:[defaultBannerState],
currentPage:1,
hasNextPage:false,
hasPrevPage:false,
}