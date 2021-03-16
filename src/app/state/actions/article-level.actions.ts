import { Article } from "@models/article.model";
import { ClarityScore } from "@models/clarity-score.model";
import { createAction, props } from "@ngrx/store";

// Initialise the component with the article.
export const initialise = createAction("[Article] Initialise", props<{ article: Article }>());

// Signal that the component is ready to be used.
export const isReady = createAction("[Article] Ready");

// Signal that Web Speech API is not supported in this browser.
export const notSupported = createAction("[Article] Not Supported");

// Proceed to the next phrase in the article.
export const nextPhrase = createAction("[Article] Next Phrase");

// Start speaking the supplied text.
export const startSpeaking = createAction("[Article] Start Speaking", props<{ text: string }>());

// Signal that the Web Speech API has changed its speaking state.
export const speakingStateChange = createAction("[Article] Speaking State Changed", props<{ isSpeaking: boolean }>());

// Accumulate the clarity score for a phrase in this article.
export const addClarityScore = createAction("[Article] Add Clarity Score", props<{ clarityScore: ClarityScore }>());
