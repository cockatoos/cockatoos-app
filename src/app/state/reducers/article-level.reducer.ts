import { createReducer, on } from "@ngrx/store";
import { Article } from "@models/article.model";
import * as ArticleLevelActions from "@state/actions/article-level.actions";
import { ClarityScore } from "@models/clarity-score.model";

export enum Status {
    UNINITIALISED = "UNINITIALISED",

    // Ready for user to record.
    READY = "READY",

    // User is on the last phrase.
    DONE = "DONE",

    // Web Speech API is unsupported by the browser.
    UNSUPPORTED = "UNSUPPORTED",
}

export interface State {
    status: Status;
    article: Article;
    phraseNum: number;
    isSpeaking: boolean;
    clarityScores: ClarityScore[];
}

export const initialState: State = {
    status: Status.UNINITIALISED,
    article: undefined,
    phraseNum: 0,
    isSpeaking: false,
    clarityScores: [],
};

export const articleLevelReducer = createReducer(
    initialState,
    on(ArticleLevelActions.changeArticle, (state, { article }) => ({
        ...state,
        article,
        phraseNum: 0,
    })),
    on(ArticleLevelActions.addClarityScore, (state, { clarityScore }) => ({
        ...state,
        clarityScores: [...state.clarityScores, clarityScore],
    })),
    on(ArticleLevelActions.nextPhrase, (state) => {
        const phraseNum = state.phraseNum + 1;
        const status = phraseNum + 1 === state.article.phrases.length ? Status.DONE : state.status;
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
    })),
    on(ArticleLevelActions.speakingStateChange, (state, { isSpeaking }) => ({
        ...state,
        isSpeaking,
    }))
);
