import { type ReduxParticipant } from "@repo/redux-utils/src/types/messaging/messaging";
import { useMessagesState } from "../providers/messages-provider.tsx";
import { getConvoParticipantsFormatted } from "../utils.ts";

interface ConversationLabelProps {
  participants?: ReduxParticipant[];
}
export default function ConversationLabel(props: ConversationLabelProps) {
  const { contactsMap, session } = useMessagesState();

  if (!props.participants) return null;
  const convoParticipantsFormatted = getConvoParticipantsFormatted(
    contactsMap,
    props.participants,
    session,
  );

  return <>{convoParticipantsFormatted.label}</>;
}
