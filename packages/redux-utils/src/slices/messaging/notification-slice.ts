import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type NotificationVariantType =
  | "error"
  | "neutral"
  | "success"
  | "warning";
export type NotificationsType = {
  id?: number;
  message: string;
  variant: NotificationVariantType;
  dismissAfter: number;
}[];
const initialState: NotificationsType = [];
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotifications: (
      state: NotificationsType,
      action: PayloadAction<NotificationsType>,
    ) => {
      state.push(...action.payload);
    },
    removeNotifications: (
      state: NotificationsType,
      action: PayloadAction<number>,
    ) => {
      const removeCount: number = action.payload;
      if (removeCount + 1 > state.length) {
        state.splice(0, state.length);
      } else {
        state.splice(-removeCount);
      }
    },
  },
});
export const { addNotifications, removeNotifications } =
  notificationSlice.actions;
