'use client'
import React from 'react';
import {Formik, FormikHelpers} from 'formik';
import Button from '../Button';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { updateoffer } from '@/redux/slices/offerSlice';
import toast from 'react-hot-toast';

interface ValueProps {
  value?:number,
  appliesToCategories?:string,
  expiresAt?:string,
  usageLimit?:number
}

const initialValues:ValueProps = {
value:0,
appliesToCategories:'',
expiresAt:'',
usageLimit:0
}

interface formProps {
  _id:string,
}

const UpdateForm:React.FC<formProps> = ({_id}) => {
  
       const dispatch = useDispatch<AppDispatch>();
  const handleOnSubmit = async(values:ValueProps,resetForm:FormikHelpers<ValueProps>)=>{
try {
  
  const payload = {
    ...values,
    appliesToCategories:values.appliesToCategories?.split(',').map((cat) => cat.trim()).filter(Boolean),
   expiresAt:values.expiresAt ? new Date(values.expiresAt) : null,
  }
dispatch(updateoffer({offerId:_id,data:payload})).unwrap().then((res)=>{
    toast.success(res.message)
}).catch((err)=>{
    toast.error(err);
})
} catch (error) {
  
}
}
  return (
    <div className='w-[70vw] h-[90vh] relative bg-black/70 flex items-center justify-center rounded-md shadow-xl'>
     <Formik initialValues={initialValues}
     onSubmit={handleOnSubmit}
>
  {({values,handleBlur,handleChange,
  handleSubmit
  })=>(
    <form className="w-[40%] h-[60%] p-4 relative flex flex-col gap-4" method='post' onSubmit={handleSubmit}>
       <div className="flex flex-col gap-2 text-white">
        <label htmlFor="value">Change Value of Offer</label>
        <input type="number" name="value" id="value"
        placeholder='Enter Offer Value'
        value={values.value}
        onChange={handleChange}
        onBlur={handleBlur}
        className='w-full py-2 px-4 border-2 border-gray-400 rounded-md'
        />
       </div>
       <div className="flex flex-col gap-2 text-white">
        <label htmlFor="usageLimit">Change Usage Limit</label>
        <input type="number" name="usageLimit" id="usageLimit"
        placeholder='Increase/Decrease Usage Limit'
        value={values.usageLimit}
        onChange={handleChange}
        onBlur={handleBlur}
        className='w-full py-2 px-4 border-2 border-gray-400 rounded-md'
        />
       </div>
       <div className="flex flex-col gap-2 text-white">
        <label htmlFor="expiresAt">Change Expiry Date</label>
        <input type='datetime-local' name="expiresAt" id="expiresAt"
        placeholder='Increase/Decrease Usage Limit'
        value={values.expiresAt}
        onChange={handleChange}
        onBlur={handleBlur}
        className='w-full py-2 px-4 border-2 border-gray-400 rounded-md'
        />
       </div>
       <div className="flex flex-col gap-2 text-white">
        <label htmlFor="appliesToCategories">Change Category of offer</label>
        <input type='text' name="appliesToCategories" id="appliesToCategories"
        placeholder='Increase/Decrease Usage Limit'
        value={values.appliesToCategories}
        onChange={handleChange}
        onBlur={handleBlur}
        className='w-full py-2 px-4 border-2 border-gray-400 rounded-md'
        />
       </div>
       <Button type='submit' className='px-3 py-2 border-2 border-first bg-transparent hover:bg-first transition-all duration-500 ease-in-out cursor-pointer'>
        Update
       </Button>
    </form>
  )}
     </Formik>
    </div>
  )
}

export default UpdateForm