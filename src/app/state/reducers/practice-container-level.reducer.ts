import { Article } from "@models/article.model";
import { createReducer, on } from "@ngrx/store";
import * as PracticeContainerLevelActions from "@state/actions/practice-container-level.actions";

export enum Status {
    INIT = "INIT",
    READY = "READY",
    ERROR = "ERROR",
}

export interface State {
    status: Status,
    articles: Article[],
    currentArticleIdx: number,
}

export const initialState: State = {
    status: Status.INIT,
    articles: [],
    currentArticleIdx: 0,
};

export const practiceContainerLevelReducer = createReducer(
    initialState,
    on(PracticeContainerLevelActions.ready, (state, { articles }) => ({
        ...state,
        articles,
        status: Status.READY,
    })),
    on(PracticeContainerLevelActions.nextArticle, (state) => ({
        ...state,
        currentArticleIdx: state.currentArticleIdx + 1,
    })),
);
