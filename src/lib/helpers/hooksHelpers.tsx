'use client'

import { useRouter } from 'next/navigation';
import { MutableRefObject } from 'react'

const hooksUtil = () => {
    const router = useRouter();

    const RUNSAFE_DISPATCH = async<T,>(ref:MutableRefObject<boolean>,action:()=>Promise<T>):Promise<T>=>{
          if(ref.current) throw new Error("Already Processing");
          ref.current = true;
     try {
   return await action();
          
     } finally{
       ref.current = false; 
     }
    }
  return {RUNSAFE_DISPATCH}
}

export default hooksUtil