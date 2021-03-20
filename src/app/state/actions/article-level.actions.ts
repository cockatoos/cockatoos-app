import { Article } from "@models/article.model";
import { ClarityScore } from "@models/clarity-score.model";
import { createAction, props } from "@ngrx/store";

// Initialise the component.
export const initialise = createAction("[Article] Initialise");

// Signal that the component is ready to be used.
export const isReady = createAction("[Article] Ready");

// Signal that Web Speech API is not supported in this browser.
export const notSupported = createAction("[Article] Not Supported");

// Proceed to the next phrase in the article.
export const nextPhrase = createAction("[Article] Next Phrase");

// Change to another article.
export const changeArticle = createAction("[Article] Change Article", props<{ article: Article }>());

// Start speaking the supplied text.
export const startSpeaking = createAction("[Article] Start Speaking", props<{ text: string }>());

// Signal that the Web Speech API has changed its speaking state.
export const speakingStateChange = createAction("[Article] Speaking State Changed", props<{ isSpeaking: boolean }>());

// Accumulate the clarity score for a phrase in this article.
export const addClarityScore = createAction("[Article] Add Clarity Score", props<{ clarityScore: ClarityScore }>());

// Save score to database.
export const saveClarityScore = createAction(
    "[Article] Save Clarity Score",
    props<{ correctWords: number; totalWords: number }>()
);

// Signal that the scores have been saved onto the database.
export const scoresSaved = createAction("[Article] Scores Saved");

// Error case.
export const error = createAction(
    "[Article] Error",
    props<{ errorMessage: string }>()
);
