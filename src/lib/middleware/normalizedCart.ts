import { Cartitem } from "@/redux/slices/cartSlice";
import { CartProps, NormalizedCart } from "@/types/cart";

export default function normalizedCart(cart:CartProps | Cartitem[]):NormalizedCart{
    if(Array.isArray(cart)){
        return {
            items:cart,
            total:cart.reduce((acc,item)=> acc + (item.variant.price * item.quantity),0)
        }
    }else{
        return {
            items:cart.items,
            total:cart.total,
            coupon:cart.coupon,
            finalTotal:cart.finalTotal,
            userId:typeof cart.userId === 'string' ? cart.userId : cart.userId.toString(),
            createdAt:cart.createdAt,
        }
    }
}