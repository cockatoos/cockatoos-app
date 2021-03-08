import { createAction, props } from "@ngrx/store";

// User signals to start recording.
export const startRecording = createAction("Start Recording");

// User signals to stop recording.
export const reset = createAction("Reset");

// Emit live transcript data.
export const liveTranscript = createAction("Live Transcript", props<{ transcript: string }>());

// User signals to stop recording.
export const stopRecording = createAction("Stop Recording");

// Emit the audio Blob for the phrase.
export const blobAvailable = createAction("Blob Available", props<{ blob: Blob }>());
