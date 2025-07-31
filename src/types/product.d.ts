import { CategoryDTO } from "./category";



export interface ProductVariantDTO {
    weight:number;
    price:number;
    stock:number;
    discount?:number;
    discountExpiry?:Date | null;
}

export interface ProductIncomingDTO{
    _id:string;
    slug:string;
    productName:string;
    category:CategoryDTO;
    status:'available' | 'unavailable';
    description:string;
    images:string[];
    isFeatured:boolean;
    tags:string[];
    avgRating:number;
    variants:ProductVariant[];
    createdAt?:Date;
    updatedAt?:Date;
}


export interface SearchQueryDTO {
    category?:string;
    price?:string;
    productName?:string;
    page?:number;
    limit?:number;
}
