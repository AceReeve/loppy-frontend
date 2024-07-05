import type { ReduxMessage } from "@repo/redux-utils/src/types/messaging/messaging";

export interface ShowReactionPickerProps {
  event: React.MouseEvent<HTMLButtonElement> | null;
  message: ReduxMessage;
}

export interface ShowEmojiPickerProps {
  event: React.MouseEvent<HTMLButtonElement> | null;
}
