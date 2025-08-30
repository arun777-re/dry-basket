'use client';

import { createUser, loginUser, logoutuser } from '@/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/redux/store/store';
import { LoginProps, UserPropsOutgoing } from '@/types/user';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import cartHook from './cartHook';
import { CartItemOutgoingDTO, PopulatedCartItemDTO } from '@/types/cart';
import { ROUTES } from '@/constants/routes';
import { mapPopulatedOurgoing } from '@/lib/middleware/normalizedCart';


const authHook = () => {
  const router = useRouter();
   const cartItems: PopulatedCartItemDTO[] = useSelector(
      (state: RootState) => state.usercart.cart.data.items
    );
    const user = useSelector((state: RootState) => state.user.user.success);
    const outgoingItems:CartItemOutgoingDTO[] = React.useMemo(()=>{
      return  mapPopulatedOurgoing(cartItems || []) || [];
    },[cartItems])
  
  
    const hasItems = outgoingItems.length > 0 && !user
   
  const {CREATECARTORADDITEMTOCART} = cartHook();
    const dispatch = useDispatch<AppDispatch>();
  const LOGOUT_USER = React.useCallback((userId:string)=>{
    dispatch(logoutuser(userId));
  },[dispatch]);


  const useRegisterUser = React.useCallback(async({values,route}:{values:UserPropsOutgoing,route:string})=>{
    const res = await dispatch(createUser(values)).unwrap();
      if(hasItems ){
         CREATECARTORADDITEMTOCART({data:outgoingItems})
      }
         router.push(`${route}` || ROUTES.HOME);
         return res;
  },[dispatch,hasItems,outgoingItems,router]);


  const useLoginUser = React.useCallback(async({values,route}:{values:LoginProps,route:string})=>{
    const res = await dispatch(loginUser(values)).unwrap();
      if(hasItems ){
         CREATECARTORADDITEMTOCART({data:outgoingItems})
      }
         router.push(`${route}` || ROUTES.HOME);
         return res;
  },[dispatch,hasItems,outgoingItems,router,CREATECARTORADDITEMTOCART]);







  return {LOGOUT_USER,useRegisterUser,useLoginUser};
}

export default authHook