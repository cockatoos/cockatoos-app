import { createReducer, on } from "@ngrx/store";
import * as PhraseLevelActions from "@state/actions/phrase-level.actions";

export enum Status {
    READY = "READY",
    RECORDING = "RECORDING",
    DONE = "DONE",
}

export interface State {
    status: Status;
    transcript: string;
    recordingEncoding?: string;
}

export const initialState: State = {
    status: Status.READY,
    transcript: "",
};

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
        return {
            ...state,
            transcript,
        };
    }),
    on(PhraseLevelActions.encodingAvailable, (state, { encoding }) => {
        return {
            ...state,
            recordingEncoding: encoding,
        };
    }),
    on(PhraseLevelActions.reset, (state) => ({
        ...state,
        status: Status.READY,
        transcript: "",
    }))
);
