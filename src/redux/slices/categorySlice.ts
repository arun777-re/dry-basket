import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CATEGORY_API } from "../services/api/category";
import { PaginatedProductResponse } from "@/types/response";
import { CategoryIncomingDTO, CategoryState } from "@/types/category";
import { ErrorProps } from "@/types/response";
import { defaultError } from "../services/helpers/userresponse";

const initialState:CategoryState = {
    error:defaultError,
    loading:false,
    category:{
    hasNextPage:false,
    hasPrevPage:false,
    currentPage:1,
    message:'',
    status:200,
    success:false,
    data:[] as any[]
    },
}



// public thunk
export const viewCategory = createAsyncThunk<
PaginatedProductResponse<CategoryIncomingDTO>,
void,
{rejectValue:ErrorProps}
>('admin/get-category',async(_,{rejectWithValue})=>{
const data = await CATEGORY_API.get_all_category({reject:rejectWithValue})
return data;
});


const categorySlice = createSlice({
name:'category',
initialState:initialState,
reducers:{},
extraReducers(builder) {
    builder 
    .addCase(viewCategory.fulfilled,(state,action)=>{
        state.loading = false;
        state.error = defaultError;
        state.category = action.payload;
    })
   
},
})

export default categorySlice.reducer;