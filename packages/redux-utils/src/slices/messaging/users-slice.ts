import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxUser } from "../../types/messaging/messaging";
import { User } from "@twilio/conversations";
import { usersMap } from "../../utils/messaging/conversations-objects.ts";

export type UsersState = {
  [identity: string]: ReduxUser;
};

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
export default usersSlice.reducer;
