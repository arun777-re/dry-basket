import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, postRequest } from "../services/middleware";
import { ROUTES } from "@/constants/routes";

const initialState = {
    error:null,
    loading:false,
    category:[] as any[],
    message:null as string | null
}

// admin thunk
export const createCategory = createAsyncThunk('admin/create-category',async(formData:Object,{rejectWithValue})=>{
const data = await postRequest({url:`${ROUTES.SERVER_BASE_URL}/v1/admin/category/create`,data:formData,reject:rejectWithValue});
return data;
});

// public thunk
export const viewCategory = createAsyncThunk('admin/get-category',async(_,{rejectWithValue})=>{
const data = await getRequest({url:`${ROUTES.SERVER_BASE_URL}/v1/admin/category/getall`,reject:rejectWithValue});
console.log('data....',data)
return data;
});

export const DeleteCategory = createAsyncThunk('admin/delete-category',async(slug:string,{rejectWithValue})=>{
const data = await deleteRequest({url:`${ROUTES.SERVER_BASE_URL}/v1/admin/category/delete/${slug}`,reject:rejectWithValue});
return data;
})

const categorySlice = createSlice({
name:'category',
initialState:initialState,
reducers:{},
extraReducers(builder) {
    builder 
    .addCase(createCategory.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = null;
        state.category = action.payload;
    })
    .addCase(viewCategory.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = null;
        state.category = action.payload;
    })
    .addCase(DeleteCategory.fulfilled,(state,action)=>
    {
         state.loading = false;
        state.error = null;
        state.message = action.payload.message;
    })
},
})

export default categorySlice.reducer;