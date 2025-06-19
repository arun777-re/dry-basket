export interface ReviewProps{
    _id?:string;
    user:{
        firstName?:string;
    };
    rating?:number;
    reviewText?:string;
    productId?:string;
    createdAt?:string | Date;
}

export interface ProductVariant {
    weight: number;
    price: number;
    stock:number;
    discount?:number;
    discountExpiry?:Date | null;
}

export interface ItemProps{
_id:string;
slug:string;
status:'available' | 'unavailable';
category:string;
productName:string;
description:string;
isFeatured:boolean;
variants:ProductVariant[];
images:string[];
reviews?:ReviewProps[];
tags:string[];
createdAt?:string | Date;
updatedAt?:string | Date;
}


export interface BlogProps{
    _id:string;
    slug:string;

}

// update stock everytime a product is purchased