"use client";

import { MessageAdd } from "iconsax-react";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useMessagesState } from "@/src/providers/messages-provider.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@repo/redux-utils/src/store.ts";
import { updateCurrentConversation } from "@repo/redux-utils/src/slices/messaging/current-conversation-slice.ts";
import { addChatParticipant, addConversation } from "@/src/utils.ts";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui";
import LoadingSpinner from "@repo/ui/loading-spinner.tsx";

export default function NewMessageDialog() {
  const { session } = useMessagesState();
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userIdentity, setUserIdentity] = useState("");
  const [error, setError] = useState<Error>();
  const { client } = useMessagesState();
  const conversations = useSelector((state: AppState) => state.conversations);

  const dispatch = useDispatch();

  const handleConfirm = () => {
    setLoading(true);
    setError(undefined);

    // Check if conversation already exists
    const existingConvo = conversations.find(
      (item) => item.friendlyName === userIdentity,
    );
    if (existingConvo) {
      setLoading(false);
      setOpen(false);
      dispatch(updateCurrentConversation(existingConvo.sid));
      setUserIdentity("");
      return;
    }

    // Search if user exists in twilio
    client
      ?.getUser(userIdentity)
      .then((user) => {
        setLoading(true);

        if (user.identity === session?.user?.email) {
          throw new Error("You can't add yourself.");
        }

        // add conversation
        addConversation(user.identity, dispatch, client)
          .then((convo) => {
            setLoading(true);
            // add the participant to the conversation
            addChatParticipant(user.identity, convo)
              .then(() => {
                setLoading(true);
                setOpen(false);
                setUserIdentity("");
                updateCurrentConversation(convo.sid);
              })
              .catch((e) => {
                setError(e);
              })
              .finally(() => {
                setLoading(false);
              });
          })
          .catch((e) => {
            setError(e);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white group-hover:flex hover:bg-gray-200 md:flex"
        onClick={() => setOpen(true)}
      >
        <MessageAdd className="relative h-5 w-5" />
      </button>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new conversation with:</DialogTitle>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              placeholder="example@email.com"
              value={userIdentity}
              onChange={(e) => setUserIdentity(e.target.value)}
              className="w-full"
            />
          </div>
          <button
            className="btn-outline-primary"
            onClick={handleConfirm}
            disabled={userIdentity.trim().length === 0 || isLoading}
          >
            {isLoading && <LoadingSpinner />}
            Create
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
