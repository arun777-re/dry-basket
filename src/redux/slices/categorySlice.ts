import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postRequest } from "../services/middleware";

const initialState = {
    error:null,
    loading:false,
    category:null,
}


export const createCategory = createAsyncThunk('admin/create-category',async(formData:Object,{rejectWithValue})=>{
const data = await postRequest({url:'/api/admin/create-category',data:formData,reject:rejectWithValue});
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
},
})

export default categorySlice.reducer;