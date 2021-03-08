import { Article } from "@models/article.model";
import { createAction, props } from "@ngrx/store";

// Initialise the component with the article.
export const initialise = createAction("Initialise Article", props<{ article: Article }>());

// Signal that the component is ready to be used.
export const isReady = createAction("Article Ready");

// Signal that Web Speech API is not supported in this browser.
export const notSupported = createAction("Not Supported");

// Proceed to the next phrase in the article.
export const nextPhrase = createAction("Next Phrase");

// Start speaking the supplied text.
export const startSpeaking = createAction("Start Speaking", props<{ text: string }>());

// Signal that the Web Speech API has changed its speaking state.
export const speakingStateChange = createAction("Speaking State Changed", props<{ isSpeaking: boolean }>());
