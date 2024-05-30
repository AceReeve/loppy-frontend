import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState : AttachmentsState = {};
export type AttachmentsState = {
    [p: string]: { [p: string]: Record<string, Blob> };
};
export const attachmentSlice = createSlice({
    name: 'attachment',
    initialState,
    reducers: {
        addAttachments: (state: AttachmentsState, action: PayloadAction<{channelSid: string, messageSid: string, mediaSid: string, attachment: Blob}>) => {
            const { channelSid, messageSid, mediaSid, attachment } = action.payload;

            // Ensure channelSid and messageSid exist
            state[channelSid] = state[channelSid] ?? {};
            state[channelSid][messageSid] = state[channelSid][messageSid] ?? {};

            // Update state with the new attachment
            state[channelSid][messageSid][mediaSid] = attachment;
        },
        clearAttachments: (state: AttachmentsState, action: PayloadAction<{channelSid: string, messageSid: string}>) => {
            const { channelSid, messageSid } = action.payload;

            // Directly assign an empty object to [channelSid][messageSid]
            state[channelSid][messageSid] = {};
        },
    },
});




export const {addAttachments,clearAttachments} = attachmentSlice.actions;
export default attachmentSlice.reducer;