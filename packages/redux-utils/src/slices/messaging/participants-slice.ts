import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  type Participant,
  type ParticipantBindings,
} from "@twilio/conversations";
import { type ReduxParticipant } from "../../types/messaging/messaging";
import { participantsMap } from "../../utils/messaging/conversations-objects.ts";

export type ParticipantsType = Record<string, ReduxParticipant[] | undefined>;

const initialState: ParticipantsType = {};

const reduxifyParticipant = (participant: Participant): ReduxParticipant => ({
  sid: participant.sid,
  attributes: participant.attributes,
  identity: participant.identity,
  type: participant.type,
  lastReadMessageIndex: participant.lastReadMessageIndex,
  address:
    participant.bindings[participant.type as keyof ParticipantBindings]
      ?.address,
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
