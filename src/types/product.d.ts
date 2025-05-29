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
    slug:string;
    productName:string;
    category:string;
    status:'available' | 'unavailable';
    description:string;
    images:string[];
    isFeatured:boolean;
    tags:string[];
    review:(Types.ObjectId | ReviewDocument)[];
    variants:ProductVariant[];
    offer?:Types.ObjectId | OfferDocument;
    createdAt?:Date;
    updatedAt?:Date;
}