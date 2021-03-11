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
