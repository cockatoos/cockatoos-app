import { createSelector } from "@ngrx/store";
import { AppState } from "@state/app.state";

const selectArticleLevel = (state: AppState) => state.articleLevel;

export const selectPhraseNum = createSelector(selectArticleLevel, ({ phraseNum }) => phraseNum);

export const selectIsSpeaking = createSelector(selectArticleLevel, ({ isSpeaking }) => isSpeaking);

export const selectArticleLevelStatus = createSelector(selectArticleLevel, ({ status }) => status);

export const selectClarityScores = createSelector(selectArticleLevel, ({ clarityScores }) => clarityScores);

export const selectArticleClarityScore = createSelector(selectArticleLevel, ({ articleClarityScore }) => articleClarityScore);