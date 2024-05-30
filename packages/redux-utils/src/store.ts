import { configureStore, ThunkAction, Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api";

import { Action } from "redux";
import conversationReducer from "./slices/messaging/conversation-slice.ts";
import currentConversationReducer from "./slices/messaging/current-conversation-slice.ts";
import participantsReducer from "./slices/messaging/participants-slice.ts";
import messageListReducer from "./slices/messaging/message-list-slice.ts";
import lastReadIndexReducer from "./slices/messaging/last-read-index-slice.ts";
import usersReducer from "./slices/messaging/users-slice.ts";

const middlewares: Middleware[] = [baseApi.middleware];

const makeStore = () =>
  configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [baseApi.reducerPath]: baseApi.reducer,
      conversations: conversationReducer,
      currentConversation: currentConversationReducer,
      lastReadIndex: lastReadIndexReducer,
      messageList: messageListReducer,
      participants: participantsReducer,
      users: usersReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "messageList/addMessages",
            "messageList/pushMessages",
            "participants/updateParticipants",
            "users/updateUser",
          ],
          ignoreState: true,
        },
      }).concat(middlewares),
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

//export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
