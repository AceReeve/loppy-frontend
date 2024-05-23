import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<string>) => {
            state = action.payload;
        },
    }
});

export const { logIn } = tokenSlice.actions;
export default tokenSlice.reducer;
