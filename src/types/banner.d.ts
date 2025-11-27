export interface BannerIncomingDTO {
    bannerImage:string;
    title?:string;
    description?:string;
    couponValue:string;
    _id:string;
}

export type BannerOutgoingDTO = Omit<BannerIncomingDTO,"_id">

export interface BannerFormValues extends BannerOutgoingDTO {
  bannerImage:File | null
}

export interface BannerState {
    loading:boolean;
    error:ErrorProps;
    banners:PaginatedIncomingAPIResponseFormat<BannerIncomingDTO>;
    message:string;    
}

export type UpdateBannerQueryDTO = {
    title?: string | undefined;
    description?: string | undefined;
    couponValue?: string | undefined;
}
export type UpdateBannerProps = {
    bannerId:string;
    data:Partial<UpdateBannerQueryDTO>
}