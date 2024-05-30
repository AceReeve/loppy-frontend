import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type LoadingState = boolean;
const initialState:LoadingState=  true;
export const loadingSlice = createSlice({
    name:'loading',
    initialState,
    reducers:{
        updateLoadingState:(state:LoadingState,action: PayloadAction<boolean>) =>{
            return action.payload;
        }
    }

})

export const {updateLoadingState} = loadingSlice.actions;
export default loadingSlice.reducer;
