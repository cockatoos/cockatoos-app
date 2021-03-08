import { createReducer, on } from "@ngrx/store";
import * as PhraseLevelActions from "@state/actions/phrase-level.actions";

export enum Status {
    READY = "READY",
    RECORDING = "RECORDING",
    DONE = "DONE",
}

export const initialState = {
    status: Status.READY,
    transcript: "",
};

export type State = typeof initialState;

export const phraseLevelReducer = createReducer(
    initialState,
    on(PhraseLevelActions.startRecording, (state) => ({
        ...state,
        status: Status.RECORDING,
    })),
    on(PhraseLevelActions.stopRecording, (state) => ({
        ...state,
        status: Status.DONE,
    })),
    on(PhraseLevelActions.liveTranscript, (state, { transcript }) => {
        // console.log("LIVE TRANSCRIPT", transcript);
        return {
            ...state,
            transcript,
        };
    }),
    on(PhraseLevelActions.reset, (state) => ({
        ...state,
        status: Status.READY,
    }))
);
