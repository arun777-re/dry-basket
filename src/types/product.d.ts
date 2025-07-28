import { Document,Types } from "mongoose";
import { ReviewDocument } from "./review";
import { OfferDocument } from "./offer";



export interface ProductVariant {
    weight:number;
    price:number;
    stock:number;
    discount?:number;
    discountExpiry?:Date | null;
}

export interface ProductDocument extends Document {
    _id:string;
    slug:string;
    productName:string;
    category:Record<string,any>;
    status:'available' | 'unavailable';
    description:string;
    images:string[];
    isFeatured:boolean;
    tags:string[];
    review:(Types.ObjectId | ReviewDocument)[];
    variants:ProductVariant[];
    createdAt?:Date;
    updatedAt?:Date;
}