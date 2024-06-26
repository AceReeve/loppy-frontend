import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "@twilio/conversations";
import { type ReduxUser } from "../../types/messaging/messaging";
import { usersMap } from "../../utils/messaging/conversations-objects.ts";

export type UsersState = Record<string, ReduxUser | undefined>;

const initialState: UsersState = {};

const reduxifyUser = (user: User): ReduxUser => ({
  identity: user.identity,
  friendlyName: user.friendlyName ?? "",
});
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      const { identity } = action.payload;
      usersMap.set(identity, action.payload);
      state[identity] = reduxifyUser(action.payload);
    },
  },
});

export const { updateUser } = usersSlice.actions;
