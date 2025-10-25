'use client';
import Spinner from '@/app/_components/Spinner';
import authHook from '@/hooks/authHook';
import React from 'react'

const VerifyEmailPage = () => {

    const {verifyUserEmail} = authHook();
     const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token') || '';
          React.useEffect(()=>{
          (async()=>{
           
            await verifyUserEmail({token});
        })()
    },[token,verifyUserEmail])

  return (
    <div className='max-w-screen w-full min-h-screen flex flex-col items-center justify-center gap-8'>
        <Spinner/>
        <h2 className='text-center mt-20 text-2xl font-semibold'>Verifying your email...</h2>

    </div>
  )
}

export default VerifyEmailPage