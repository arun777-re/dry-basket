'use client'



import { addItemsToCart, applyCoupon, clearUserCart, createCartOptimisticforUX, createOraddItemGuestCart, getCart, getUserGuestCart, removeCartItem, updateItemQty } from '@/redux/slices/cartSlice';
import { AppDispatch, RootState, store } from '@/redux/store/store';
import { CartItemOutgoingDTO, PopulatedCartItemDTO, UpdateQtyDTO } from '@/types/cart';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const cartHook = () => {
const dispatch = useDispatch<AppDispatch>();
const user = useSelector((state:RootState)=> state.user.user.success);
const userCart = useSelector((state:RootState)=> state.usercart.cart);

const CREATECARTORADDITEMTOCART = React.useCallback(async({data}:{data:CartItemOutgoingDTO[]})=>{
dispatch(addItemsToCart(data))
},[dispatch])

const GETUSERCART = React.useCallback(async()=>{
 const res = await dispatch(getCart()).unwrap();
    localStorage.removeItem('guest_cart');
    return res.data;
},[dispatch])
const UPDATE_ITEM_QTY = React.useCallback(async({payload,setUserCart}:{setUserCart:(value:any)=>any,payload:UpdateQtyDTO})=>{
  const {productId,delta} = payload;
  dispatch(updateItemQty({productId,delta})).unwrap().then((res)=>{
    localStorage.removeItem('guest_cart');
    setUserCart(res?.data)
  })
},[dispatch])
const REMOVE_ITEM_FROM_CART = React.useCallback(async({productId,setUserCart}:{productId:string,setUserCart:(value:any)=>any})=>{
  dispatch(removeCartItem({productId})).unwrap().then((res)=>{
    localStorage.removeItem('guest_cart');
    setUserCart(res?.data)
  })
},[dispatch]);
const APPLY_COUPON = React.useCallback(async(code:string)=>{
  dispatch(applyCoupon(code))
},[dispatch]);

const CLEAR_CART = React.useCallback(async()=>{
  dispatch(clearUserCart());
},[]);

// for get request
const handleCartItems = async()=>{
    if (user) {
   await GETUSERCART();
    } else {
      dispatch(getUserGuestCart());
      const updatedCart = store.getState().usercart.cart
    }
}

//  for add item to cart
  const addToCart = async({e,payload,backendpayload}:{e: React.MouseEvent<HTMLOrSVGElement>,payload:PopulatedCartItemDTO[],backendpayload:CartItemOutgoingDTO[]}) => {
    e.stopPropagation();
    if(user) {
      if(userCart.data && userCart.data!.items.length > 0){
     payload.forEach(item => dispatch(createCartOptimisticforUX(item)))
      }
      CREATECARTORADDITEMTOCART({data:backendpayload})
    } else {
   // for guest cart
    payload.forEach(item => dispatch(createOraddItemGuestCart(item))
    )    

    }
  };

  return {CREATECARTORADDITEMTOCART,GETUSERCART,UPDATE_ITEM_QTY,REMOVE_ITEM_FROM_CART,
    APPLY_COUPON,
    CLEAR_CART,
    handleCartItems,
    addToCart
  }
}

export default cartHook