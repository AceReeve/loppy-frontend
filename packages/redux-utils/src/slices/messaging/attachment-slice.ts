import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AttachmentsState = {};
export type AttachmentsState = Record<
  string,
  Record<string, Record<string, Blob>> | undefined
>;
export const attachmentSlice = createSlice({
  name: "attachment",
  initialState,
  reducers: {
    addAttachments: (
      state: AttachmentsState,
      action: PayloadAction<{
        channelSid: string;
        messageSid: string;
        mediaSid: string;
        attachment: Blob;
      }>,
    ) => {
      const { channelSid, messageSid, mediaSid, attachment } = action.payload;

      // Ensure channelSid and messageSid exist
      state[channelSid] = state[channelSid] ?? {};

      const messages = state[channelSid];

      messages[messageSid] = state[channelSid][messageSid] ?? {};

      // Update state with the new attachment
      messages[messageSid][mediaSid] = attachment;
    },
    clearAttachments: (
      state: AttachmentsState,
      action: PayloadAction<{ channelSid: string; messageSid: string }>,
    ) => {
      const { channelSid, messageSid } = action.payload;

      const messages = state[channelSid];
      // Directly assign an empty object to [channelSid][messageSid]
      if (messages) {
        messages[messageSid] = {};
      }
    },
  },
});

export const { addAttachments, clearAttachments } = attachmentSlice.actions;
