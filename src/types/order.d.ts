import { CartItemOutgoingDTO, PopulatedCartItemDTO, PopulatedIncomingCartDTO } from "./cart";

export interface ShippingDetailsDTO {
    country:string;
    firstName:string;
    lastName:string;
    address:string;
    appartment:string;
    city:string;
    state:string;
    pinCode:string;
}

export interface OrderOutgoingReqDTO {
   userId?:string;
   cartId?:string;
   shippingDetails:ShippingDetails;
   status?:string;
   amount:number;
   currency?:string;
   receipt?:string;
   notes?:string[];
}

export interface CreateOrderIncomingReqDTO{
order:{
   _id:string;
   userId?:string;
   cartId?:string;
   shippingDetails:ShippingDetails;
   status?:string;
   amount:number;
   currency?:string;
   receipt?:string;
   notes?:string[];
},
   razorpayOrderId:string,
   razorpayKey:string
}

export interface CourierInfoDTO {
  courierName:string,
    courierTrackingId:string,
    awbNumber:string,
    estimatedDelieveryDate:Date,
    shipmentOrderId:string;
}

export interface OrderIncomingReqDTO {
  _id?:string | Types.ObjectId;
   userId:{
      email:string;
   };
   cartId:PopulatedIncomingCartDTO;
   cartItems:PopulatedCartItemDTO[];
   shippingDetails:ShippingDetails;
   orderStatus:string;
   amount:number;
   currency:string;
   receipt?:string;
   notes?:string[];
   razorpayOrderId:string;
   paymentStatus?:string;
   paymentId?:string;
   paymentType?:string;
   courierInfo?:CourierInfoDTO;
    trackingHistory?:{
      status:string;
      location:string;
      timeStamp:Date;
    }[];
    blogsAgree:boolean;
    createdAt?:Date | string;
    updatedAt?:Date | string;
}


export type SEARCHORDERQUERYDTO = {
   page:number;
   limit:number;
}