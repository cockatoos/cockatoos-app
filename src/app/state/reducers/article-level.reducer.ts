import { createReducer, on } from "@ngrx/store";
import { Article } from "@models/article.model";
import * as ArticleLevelActions from "@state/actions/article-level.actions";

export enum Status {
    UNINITIALISED = "UNINITIALISED",
    CHECK_SUPPORT = "CHECK_SUPPORT",
    READY = "READY",
    DONE = "DONE",
    UNSUPPORTED = "UNSUPPORTED",
}

const emptyArticle: Article = {
    text: "",
    phrases: [],
};

export const initialState = {
    status: Status.UNINITIALISED,
    article: emptyArticle,
    phraseNum: 0,
};

export type State = typeof initialState;

export const articleLevelReducer = createReducer(
    initialState,
    on(ArticleLevelActions.initialise, (state, { article }) => ({
        ...state,
        status: Status.CHECK_SUPPORT,
        article,
    })),
    on(ArticleLevelActions.nextPhrase, (state) => {
        const phraseNum = state.phraseNum + 1;
        const status = phraseNum === state.article.phrases.length ? Status.DONE : state.status;
        console.log(phraseNum, "vs", state.article.phrases.length);
        return {
            ...state,
            status,
            phraseNum,
        };
    }),
    on(ArticleLevelActions.isReady, (state) => ({
        ...state,
        status: Status.READY,
    })),
    on(ArticleLevelActions.notSupported, (state) => ({
        ...state,
        status: Status.UNSUPPORTED,
    }))
);
