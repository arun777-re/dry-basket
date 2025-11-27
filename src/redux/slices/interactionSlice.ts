import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { defaultError } from "../services/helpers/userresponse";
import { IncomingAPIResponseFormat } from "@/types/response";
import { InteractionOutgoingDTO, InteractionSlice } from "@/types/interaction";
import { ErrorProps } from "@/types/response";
import { InteractionAPISFETCH } from "../services/api/interaction";


const initialState:InteractionSlice = {
    loading:false,
    error:defaultError,
    interaction:{
        message:"",
        success:false,
        status:0,
        data:null
    }
} 

export const createInteractionThunk = createAsyncThunk<
IncomingAPIResponseFormat<null>,
InteractionOutgoingDTO,
{rejectValue:ErrorProps}
>('interaction/create',async({productId,action},{rejectWithValue})=>{
   const res = await InteractionAPISFETCH.createUserInteraction({reject:rejectWithValue,query:{productId,action}});
   return res;
})
const interactionSlice = createSlice({
    name:"interaction",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createInteractionThunk.fulfilled,(state,action)=>{
            state.loading = false;
            state.interaction = action.payload
        })
    }
});


export default interactionSlice.reducer;






