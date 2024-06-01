//import { JSONValue, Participant, ParticipantType } from "@twilio/conversations";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReduxParticipant } from "../../types/messaging/messaging";
import { Participant } from "@twilio/conversations";
import { participantsMap } from "../../utils/messaging/conversations-objects.ts";

export type ParticipantsType = Record<string, ReduxParticipant[]>;

const initialState: ParticipantsType = {};

const reduxifyParticipant = (participant: Participant): ReduxParticipant => ({
  sid: participant.sid,
  attributes: participant.attributes,
  identity: participant.identity,
  type: participant.type,
  lastReadMessageIndex: participant.lastReadMessageIndex,
});

export const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    updateParticipants: (
      state,
      action: PayloadAction<{ sid: string; participants: Participant[] }>,
    ) => {
      for (const participant of action.payload.participants) {
        participantsMap.set(participant.sid, participant);
      }

      const { sid, participants } = action.payload;
      state[sid] = participants.map(reduxifyParticipant);
    },
  },
});

export const { updateParticipants } = participantsSlice.actions;
export default participantsSlice.reducer;
