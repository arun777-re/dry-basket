import { CategoryDTO } from "./category";



export interface ProductVariantDTO {
    weight:number;
    price:number;
    stock:number;
    discount?:number;
    discountExpiry?:Date | null;
    priceAfterDiscount:number;
}

export interface ProductIncomingDTO{
    _id:string;
    slug:string;
    productName:string;
    category:string ;
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

export interface ProductCardProps {
  productId?: string;
  images: string[];
  productName: string;
  variants: ProductVariantDTO[];
  slug: string;
  category: string;
  description: string;
}

export interface SearchQueryDTO {
    category?:string;
    price?:number;
    productName?:string;
    page?:number;
    limit?:number;
    searchValue?:string;
    weight?:string;
}

export interface PremiumProductDTO {
  image: string;
  category?: string;
  description?: string;
  altText?:string;
}

export interface ProductDescriptionDTO {
  avgRating?: number;
  images: string[];
  description: string;
  productName: string;
  variants:ProductVariantDTO[];
  category:string;
  _id:string;
}