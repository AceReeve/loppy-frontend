import { type ReduxParticipant } from "@repo/redux-utils/src/types/messaging/messaging";
import { PhoneIcon } from "@heroicons/react/20/solid";
import { DefaultAvatar } from "@repo/ui/components/custom";
import { useMessagesState } from "../providers/messages-provider.tsx";
import { getConvoParticipantsFormatted } from "../utils.ts";

interface ConversationPhotoProps {
  participants?: ReduxParticipant[];
  className?: string;
}
export default function ConversationPhoto(props: ConversationPhotoProps) {
  const { contactsMap, session } = useMessagesState();

  if (!props.participants) return null;

  const convoParticipantsFormatted = getConvoParticipantsFormatted(
    contactsMap,
    props.participants,
    session,
  );

  const renderAvatar = () => {
    const { participants, label } = convoParticipantsFormatted;

    if (participants.length === 0) {
      return <DefaultAvatar className="size-full" image="" />;
    }

    if (participants.length === 1) {
      const participant = participants[0];
      const image = participant.type === "chat" ? "" : "";
      const name = participant.type === "chat" ? participant.identity : label;

      return <DefaultAvatar className="size-full" image={image} name={name} />;
    }

    return (
      <div className="relative size-full">
        {participants.slice(0, 2).map((participant, index) => {
          const image = participant.type === "chat" ? "" : "";
          const name =
            participant.type === "chat" ? participant.identity : label;

          return (
            <DefaultAvatar
              key={participant.sid}
              className={`absolute size-[70%] ${index === 0 ? "right-0 top-0" : "bottom-0 left-0"}`}
              image={image}
              name={name}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={`relative flex size-full ${props.className ?? ""}`}>
      {renderAvatar()}
      <div className="absolute bottom-0 right-0 rounded-full bg-white">
        <div className="size-5 rounded-full">
          {convoParticipantsFormatted.participants[0]?.type === "chat" ? (
            <img
              src="/assets/images/logo.png"
              alt=""
              className="size-full object-fill"
            />
          ) : (
            <PhoneIcon className="size-full object-cover p-1 text-blue-800" />
          )}
        </div>
      </div>
    </div>
  );
}
