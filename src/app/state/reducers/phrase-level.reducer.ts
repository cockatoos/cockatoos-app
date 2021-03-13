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
    on(PhraseLevelActions.blobAvailable, (state, { blob }) => {
        // For debugging purposes
        console.log(blob, blob.type);

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = (): void => {
            const base64 = reader.result as string;
            console.log(base64.split(",")[1]);
        };

        //// Uncomment to download the audio file...
        // const url = URL.createObjectURL(blob);
        // const a = document.createElement("a");
        // a.setAttribute("style", "display: none;");
        // a.setAttribute("href", url);
        // a.setAttribute("download", "test.wbm");
        // document.body.appendChild(a);
        // a.click();
        // URL.revokeObjectURL(url);

        return state;
    }),
    on(PhraseLevelActions.reset, (state) => ({
        ...state,
        status: Status.READY,
    }))
);
