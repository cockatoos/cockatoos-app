import { createAction, props } from "@ngrx/store";

// User signals to start recording.
export const startRecording = createAction("[Phrase] Start Recording");

// User signals to stop recording.
export const reset = createAction("[Phrase] Reset");

// Emit live transcript data.
export const liveTranscript = createAction("[Phrase] Live Transcript", props<{ transcript: string }>());

// User signals to stop recording.
export const stopRecording = createAction("[Phrase] Stop Recording");

// Emit the audio Blob for the phrase.
export const blobAvailable = createAction("[Phrase] Blob Available", props<{ blob: Blob }>());

// Emit the base64 encoding of the  audio Blob for the phrase.
export const encodingAvailable = createAction("[Phrase] Encoding Available", props<{ encoding: string }>());
