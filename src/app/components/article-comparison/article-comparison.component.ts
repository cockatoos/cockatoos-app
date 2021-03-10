import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";

import { Article } from "@models/article.model";

import { Store } from "@ngrx/store";
import { AppState } from "@state/app.state";
import { initialise, nextPhrase, startSpeaking } from "@state/actions/article-level.actions";
import { startRecording, stopRecording } from "@state/actions/phrase-level.actions";
import { Status as ArticleLevelStatus } from "@state/reducers/article-level.reducer";
import { Status as PhraseLevelStatus } from "@state/reducers/phrase-level.reducer";
import { selectArticleLevelStatus, selectIsSpeaking, selectPhraseNum } from "@state/selectors/article-level.selectors";
import { selectPhraseLevelStatus, selectTranscript } from "@state/selectors/phrase-level.selectors";


@Component({
    selector: "app-article-comparison",
    templateUrl: "./article-comparison.component.html",
    styleUrls: ["./article-comparison.component.sass"],
})
export class ArticleComparisonComponent implements OnInit {
    @Input()
    article: Article;

    // Status of ArticleLevel ("outer") component, e.g. ready to use? on last phrase?
    articleLevelStatus$: Observable<ArticleLevelStatus>;

    // _Index_ of the current phrase/
    phraseNum$: Observable<number>;

    // Status of PhraseLevel ("inner") component, e.g. is it recording?
    phraseLevelStatus$: Observable<PhraseLevelStatus>;

    // Transcript of the _active_ phrase.
    transcript$: Observable<string>;

    // Flag to signal if the text-to-speech service is speaking.
    isSpeaking$: Observable<boolean>;

    constructor(private store: Store<AppState>) {
        this.articleLevelStatus$ = store.select(selectArticleLevelStatus);
        this.phraseNum$ = store.select(selectPhraseNum);
        this.phraseLevelStatus$ = store.select(selectPhraseLevelStatus);
        this.transcript$ = store.select(selectTranscript);
        this.isSpeaking$ = store.select(selectIsSpeaking);
    }

    ngOnInit(): void {
        // Initialise state with the current article.
        this.store.dispatch(initialise({ article: this.article }));
    }

    /**
     * Returns the target phrase in this article.
     */
    get targetPhrase$(): Observable<string> {
        const { text, phrases } = this.article;
        return this.phraseNum$.pipe(
            map((phraseNum) => {
                const { startIndex, endIndex } = phrases[phraseNum];
                return text.slice(startIndex, endIndex);
            })
        );
    }

    speak(): void {
        this.targetPhrase$.pipe(first()).subscribe((targetPhrase) => {
            this.store.dispatch(startSpeaking({ text: targetPhrase }));
        });
    }

    startRecording(): void {
        this.store.dispatch(startRecording());
    }

    stopRecording(): void {
        this.store.dispatch(stopRecording());
    }

    nextPhrase(): void {
        this.store.dispatch(nextPhrase());
    }
}
