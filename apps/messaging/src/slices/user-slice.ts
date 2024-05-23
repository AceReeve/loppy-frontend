import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type ReduxUser = {
    identity: string;
    friendlyName: string;
};

export type UsersState = {
    [identity: string]: ReduxUser;
};

const initialState: UsersState = {};

const reduxifyUser = (user: User): ReduxUser => ({
    identity: user.identity,
    friendlyName: user.friendlyName ?? "",
});
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, action: PayloadAction<User>) {
            const { identity } = action.payload;
            usersMap.set(identity, action.payload);
            state[identity] = reduxifyUser(action.payload);
        }
    }
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;