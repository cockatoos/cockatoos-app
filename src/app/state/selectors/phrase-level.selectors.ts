import { createSelector } from "@ngrx/store";
import { AppState } from "@state/app.state";

const selectPhraseLevel = (state: AppState) => state.phraseLevel;

export const selectTranscript = createSelector(
    selectPhraseLevel,
    ({ transcript }) => transcript,
);

export const selectPhraseLevelStatus = createSelector(
    selectPhraseLevel,
    ({ status }) => status,
);
