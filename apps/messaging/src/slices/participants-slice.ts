//import { JSONValue, Participant, ParticipantType } from "@twilio/conversations";
import {createSlice} from "@reduxjs/toolkit";
import type{PayloadAction} from "@reduxjs/toolkit";
import {NotificationsType} from "@/src/slices/notification-slice.ts";


export type ReduxParticipant = {
    sid: string;
    attributes: JSONValue;
    identity: string | null;
    type: ParticipantType;
    lastReadMessageIndex: number | null;
};

export type ParticipantsType = Record<string, ReduxParticipant[]>;

const initialState: ParticipantsType = {};

const reduxifyParticipant = (participant: Participant): ReduxParticipant => ({
    sid: participant.sid,
    attributes: participant.attributes,
    identity: participant.identity,
    type: participant.type,
    lastReadMessageIndex: participant.lastReadMessageIndex,
});


export const participantSlice = createSlice({
    name:"participant",
    initialState ,
    reducers: {
        updateParticipants: (state, action: PayloadAction<{ sid: string, participants: Participant[] }>) => {
            const { sid, participants } = action.payload;
            state[sid] = participants.map(reduxifyParticipant);
        },
    }
});

export const {updateParticipants} = participantSlice.actions
export default participantSlice.reducer