import { createSelector } from "@ngrx/store";
import { AppState } from "@state/app.state";

const selectPracticeContainerLevel = (state: AppState) => state.practiceContainerLevel;

export const selectArticle = createSelector(
    selectPracticeContainerLevel,
    ({ articles, currentArticleIdx }) => articles.length === 0 ? undefined : articles[currentArticleIdx],
);

export const selectPracticeContainerLevelStatus = createSelector(
    selectPracticeContainerLevel,
    ({ status }) => status,
);

export const noMoreArticles = createSelector(
    selectPracticeContainerLevel,
    ({ articles, currentArticleIdx }) => currentArticleIdx + 1 === articles.length,
);
