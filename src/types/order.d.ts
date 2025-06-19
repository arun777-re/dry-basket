import { Types } from "mongoose";

export interface ShippingDetails {
    country:string;
    firstName:string;
    lastName:string;
    address:string;
    appartment:string;
    city:string;
    state:string;
    pinCode:string;
}

export interface OrderSchema {
   userId:Types.ObjectId,
   cart:Types.ObjectId,
   shippingDetails:ShippingDetails,
   status:string,
}