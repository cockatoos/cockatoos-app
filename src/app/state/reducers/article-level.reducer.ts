import { createReducer, on } from "@ngrx/store";
import { Article } from "@models/article.model";
import * as ArticleLevelActions from "@state/actions/article-level.actions";
import { ClarityScore } from "@models/clarity-score.model";

export enum Status {
    UNINITIALISED = "UNINITIALISED",

    // Ready for user to record.
    READY = "READY",

    // Web Speech API is unsupported by the browser.
    UNSUPPORTED = "UNSUPPORTED",

    // In the process of saving the clarity score.
    SAVING_SCORES = "SAVING",

    // Successfully saved clarity score.
    CLARITY_SCORE_SAVED = "CLARITY_SCORE_SAVED",

    // Successfully saved clarity score.
    ACCENT_SCORE_SAVED = "ACCENT_SCORE_SAVED",

    // Error case.
    ERROR = "ERROR",
}

export interface State {
    status: Status;
    article: Article;
    phraseNum: number;
    isSpeaking: boolean;
    clarityScores: ClarityScore[];
    errorMessage?: string;
    articleClarityScore?: ClarityScore;
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
        clarityScores: [],
        articleClarityScore: undefined,
    })),
    on(ArticleLevelActions.addClarityScore, (state, { clarityScore }) => ({
        ...state,
        clarityScores: [...state.clarityScores, clarityScore],
    })),
    on(ArticleLevelActions.nextPhrase, (state) => {
        const phraseNum = state.phraseNum + 1;
        return {
            ...state,
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
    })),
    on(ArticleLevelActions.saveClarityScore, (state, { correctWords, totalWords }) => ({
        ...state,
        status: Status.SAVING_SCORES,
        articleClarityScore: {
            numCorrectWords: correctWords,
            numTotalWords: totalWords,
        },
    })),
    on(ArticleLevelActions.clarityScoreSaved, (state) => ({
        ...state,
        status: Status.CLARITY_SCORE_SAVED,
    })),
    on(ArticleLevelActions.accentScoreSaved, (state) => ({
        ...state,
        status: Status.ACCENT_SCORE_SAVED,
    })),
    on(ArticleLevelActions.clearArticleState, (state) => {
        return {
            ...state,
            status: Status.READY,
            phraseNum: 0,
            clarityScores: [],
            articleClarityScore: undefined,
        };
    }),
    on(ArticleLevelActions.error, (state, { errorMessage }) => ({
        ...state,
        status: Status.ERROR,
        errorMessage,
    }))
);
