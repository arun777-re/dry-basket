import { CartItemOutgoingDTO, CouponInfoDTO, PopulatedCartItemDTO, PopulatedIncomingCartDTO } from "@/types/cart";

export const defaultPopulatedCartItems:PopulatedCartItemDTO = {
    productId:{
        _id:'',
        images:[''],
        productName:''
    },
    categoryOfProduct:'',
    quantity:0,
    variant:{
        price:0,
        weight:0,
        priceAfterDiscount:0
    },
    addedAtPrice:0,
    subtotal:0
}

export const defaultGuestCartItemsValue:CartItemOutgoingDTO = {
    productId:'',
    categoryOfProduct:'',
    quantity:0,
    variant:{
        price:0,
        weight:0,
        priceAfterDiscount:0
    },
    addedAtPrice:0,
    subtotal:0
}

export const defaultCartCouponState:CouponInfoDTO = {
    code:'',
    discountAmount:0,
    percentage:0
}

export const defaultPopulatedCartResponse:PopulatedIncomingCartDTO = {
_id:'',
items:[],
total:0,
finalTotal:0,
totalWeight:0,
coupon:[],
}

