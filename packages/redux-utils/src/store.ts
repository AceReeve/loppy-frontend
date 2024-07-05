import type { ThunkAction, Middleware, Action } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api";
import { conversationsSlice } from "./slices/messaging/conversation-slice.ts";
import { currentConversationSlice } from "./slices/messaging/current-conversation-slice.ts";
import { participantsSlice } from "./slices/messaging/participants-slice.ts";
import { messageListSlice } from "./slices/messaging/message-list-slice.ts";
import { lastReadIndexSlice } from "./slices/messaging/last-read-index-slice.ts";
import { attachmentSlice } from "./slices/messaging/attachment-slice.ts";
import { typingDataSlice } from "./slices/messaging/typing-data-slice.ts";
import { unreadMessageSlice } from "./slices/messaging/unread-messages-slice.ts";
import { usersSlice } from "./slices/messaging/users-slice.ts";

const middlewares: Middleware[] = [baseApi.middleware];

const makeStore = () =>
  configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [baseApi.reducerPath]: baseApi.reducer,
      attachment: attachmentSlice.reducer,
      conversations: conversationsSlice.reducer,
      currentConversation: currentConversationSlice.reducer,
      lastReadIndex: lastReadIndexSlice.reducer,
      messageList: messageListSlice.reducer,
      participants: participantsSlice.reducer,
      typingData: typingDataSlice.reducer,
      unreadMessages: unreadMessageSlice.reducer,
      users: usersSlice.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            "conversations/filterConversations",
            "conversations/upsertConversation",
            "conversations/removeConversation",
            "conversations/updateConversation",
            "messageList/addMessages",
            "messageList/pushMessages",
            "participants/updateParticipants",
            "users/updateUser",
            "attachment/addAttachments",
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
