import { IncomingAPIResponseFormat } from "./response";

export interface CommonVariantDTO {
  weight: number;
  price: number;
  priceAfterDiscount?:number;
}

interface BaseCartItem {
  productId:string ;
  categoryOfProduct:string;
  quantity:number;
  variant:CommonVariantDTO;
  addedAtPrice:number;
  subtotal?:number;
}


export interface CartItemOutgoingDTO extends BaseCartItem{};

export interface CouponInfoDTO {
  code: string;
  discountAmount: number;
  percentage: number;
}

export interface CartOutgoingDTO {
  items: CartItemIncomingDTO[];
  total?: number; // optional, service can compute
  coupon?: CouponInfoDTO[];
  finalTotal?: number; // optional, computed
}



export interface CartIncomingDTO {
  _id?:string;
  items: CartItemOutoingDTO[];
  total: number;
  coupon?: CouponInfoDTO[]; // allow multiple if needed
  finalTotal: number;
  totalWeight:number;
  createdAt?: Date;
  updatedAt?: Date;
} 

export interface PopulatedProductInfo{
      _id: string;
  images: string[];
  productName: string;
}

export interface PopulatedCartItemDTO extends BaseCartItem{
  productId: PopulatedProductInfo; // populated
  subtotal: number;
}
export interface PopulatedIncomingCartDTO extends CartIncomingDTO {
  items:PopulatedCartItemDTO[] ;
}

export interface UpdateQtyDTO {
  productId: string;
  delta: number;
}

export interface CartState {
  cart: IncomingAPIResponseFormat<PopulatedIncomingCartDTO>;
  loading: boolean;
  error: ErrorProps;
  message: string;
  prevSnapshot:IncomingAPIResponseFormat<PopulatedIncomingCartDTO> | null;
}