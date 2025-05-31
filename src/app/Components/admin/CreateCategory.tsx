import { AppDispatch } from '@/redux/store/store';
import { Button } from '@radix-ui/themes';
import { Formik, FormikHandlers, FormikHelpers, FormikProps } from 'formik'
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';


const initialValues = {
    parent:'',
    name:''
}

const CreateCategory = () => {

    const dispatch = useDispatch<AppDispatch>();

    const handleOnSubmit = useCallback(async(values:Record<string,any>,{resetForm}:FormikHelpers<any>)=>{
     
        dispatch({
            type:"api/request",
            payload:{
                method:'POST',
                url:"/api/admin/create-category",
                data:values,
                onSuccess:()=>console.log('created'),
                onError:()=>console.log('discarded')
            }
        })
resetForm();
    },[]);
  return (
    <div className='w-full min-h-screen h-full '>
        <h4>Create Category</h4>
        <Formik initialValues={initialValues} 
        onSubmit={handleOnSubmit}>
{({values,errors,touched,handleBlur,handleChange,handleSubmit})=>(
    <form method='POST' onSubmit={handleSubmit} className='w-full h-full flex flex-col gap-4 py-10 px-6 mt-10 border-2 border-gray-400 rounded-md'>
    <input type="text" 
    placeholder='Enter parent Category Name if not parent then donot enter'
    name='parent'
    value={values.parent}
    onChange={handleChange}
    onBlur={handleBlur}
    className='w-full rounded-md border-1 border-gray-400 py-4 px-6'
    />
    <input type="text" 
    placeholder='Enter category name you want to create '
    name='name'
    value={values.name}
    onChange={handleChange}
    onBlur={handleBlur}
    className='w-full rounded-md border-1 border-gray-400 py-4 px-6'
    required
    />
    <Button className='px-4 py-2 rounded-full cursor-pointer hover:bg-first border-1 border-head' type="submit">Create</Button >
    
    </form>
)}
        </Formik>
    </div>
  )
}

export default CreateCategory