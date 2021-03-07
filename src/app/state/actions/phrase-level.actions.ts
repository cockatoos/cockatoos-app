import { createAction, props } from "@ngrx/store";

export const startRecording = createAction("Start Recording");

export const reset = createAction("Reset");

export const liveTranscript = createAction("Live Transcript", props<{ transcript: string }>());

export const stopRecording = createAction("Stop Recording");

export const blobAvailable = createAction("Blob Available", props<{ blob: Blob }>());
