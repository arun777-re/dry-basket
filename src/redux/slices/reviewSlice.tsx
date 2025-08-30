import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ErrorProps, IncomingAPIResponseFormat, PaginatedProductResponse } from "@/types/response";
import { defaultError } from "../services/helpers/userresponse";
import { ReviewIncomingDTO, ReviewOutgoingDTO } from "@/types/review";
import { defaultReviews } from "../services/helpers/reviewresponse";
import { REVIEWAPI } from "../services/api/review";



type reviewSlice = {
error:ErrorProps,
loading:boolean,
review:ReviewIncomingDTO[],
message:string
}

const initialState:reviewSlice = {
     error:defaultError,
     loading:false,
     review:[defaultReviews],
     message:''
}

export const createReviewThunk = createAsyncThunk<
IncomingAPIResponseFormat<ReviewIncomingDTO>,
{data:ReviewOutgoingDTO,
productId:string
},
{rejectValue:ErrorProps}
>('review/create',async({productId,data},{rejectWithValue})=>{
const response = await REVIEWAPI.createReview({reject:rejectWithValue,data,productId})
return response;
});

export const getReviewThunk = createAsyncThunk<
PaginatedProductResponse<ReviewIncomingDTO>,
string,
{rejectValue:ErrorProps}
>('review/get',async(productId,{rejectWithValue})=>{
const response = await REVIEWAPI.getReviews({reject:rejectWithValue,productId:productId})
return response;
});


const reviewSlice = createSlice({
    name:'review',
    initialState:initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createReviewThunk.fulfilled,(state,action)=>{
            state.loading = false;
            state.message = action.payload.message;
            state.error = defaultError;
        })
        .addCase(getReviewThunk.pending,(state)=>{
            state.loading = true;
            state.error = defaultError;
        })
        .addCase(getReviewThunk.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || defaultError;
        })
        .addCase(getReviewThunk.fulfilled,(state,action)=>{
            state.loading = false;
            state.review = action.payload.data!;
            state.error = defaultError;
        })
    }
})

export default reviewSlice.reducer;