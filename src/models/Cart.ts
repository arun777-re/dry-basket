import { CartProps } from "@/types/cart";
import { acceleratedValues } from "framer-motion";
import mongoose from "mongoose";
import { Princess_Sofia } from "next/font/google";



const cartSchema = new mongoose.Schema<CartProps>({
    items:[{
        productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:0,
        },
        variant:{
            weight:{type:Number,required:true},
            price:{type:Number,required:true},
            discount:{type:Number,required:true},
            discountExpiry:{type:Date,default:null}
        },
        addedAtPrice:{
            type:Number,
            required:true,
        },
        subTotal:{
            type:Number,
            required:true,
            default:0,
        }
    }],
    userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true,
    },
    total:{
        type:Number,
        required:true,
        default:0,
    },
    coupon:{
        code:{type:String,default:null},
        discountAmount:{type:Number,default:0},
        percentage:{type:Number,default:0},
    },
    finalTotal:{
        type:Number,
        required:true,
        default:0,
    },
},{timestamps:true});

cartSchema.pre('save',function(next){

    const cart = this as any;

    // calculate subtotal for each item
    cart.items = cart.items.map((item:any)=>{
        const discountRate = item.variant.discount / 100;
        const priceAfterDiscount = item.variant.price * (1 - discountRate);
        item.subtotal = priceAfterDiscount * item.quantity;
        return item;
    });

    // cart total = sum of all subtotals
    cart.total = cart.items.reduce((acc:number,item:any)=>{
        acc + item.subtotal
    },0);

    // apply coupan if any
    let finalTotal = cart.total;

    if(cart.coupan?.discountAmount){
        finalTotal -= cart.coupan.discountAmount;
    }

    if(cart.coupan?.percentage){
        finalTotal -= (cart.total * cart.coupan.percentage) / 100;

    }

    cart.finalTotal = Math.max(finalTotal,0);
    next();
});


const Cart = mongoose.models.Cart || mongoose.model('Cart',cartSchema);
export default Cart;