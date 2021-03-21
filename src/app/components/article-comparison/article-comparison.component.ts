import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { first, map } from "rxjs/operators";

import { Article, Phrase } from "@models/article.model";

import { Store } from "@ngrx/store";
import { AppState } from "@state/app.state";
import {
    initialise,
    nextPhrase,
    startSpeaking,
    addClarityScore,
    changeArticle,
    saveClarityScore,
} from "@state/actions/article-level.actions";
import { reset, startRecording, stopRecording } from "@state/actions/phrase-level.actions";
import { Status as ArticleLevelStatus } from "@state/reducers/article-level.reducer";
import { Status as PhraseLevelStatus } from "@state/reducers/phrase-level.reducer";
import {
    selectArticleClarityScore,
    selectArticleLevelStatus,
    selectClarityScores,
    selectIsSpeaking,
    selectPhraseNum,
} from "@state/selectors/article-level.selectors";
import { selectPhraseLevelStatus, selectTranscript } from "@state/selectors/phrase-level.selectors";
import { ArticleComparisonService } from "@services/article-comparison.service";
import { ClarityScore, clarityScoreFromEdits } from "@models/clarity-score.model";
import { sumBy } from "lodash";

@Component({
    selector: "app-article-comparison",
    templateUrl: "./article-comparison.component.html",
    styleUrls: ["./article-comparison.component.sass"],
})
export class ArticleComparisonComponent implements OnInit, OnChanges, OnDestroy {
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

    private clarityScores$: Observable<ClarityScore[]>;
    articleClarityScore$: Observable<ClarityScore>;

    private subscription: Subscription;

    constructor(private store: Store<AppState>, private articleComparisonService: ArticleComparisonService) {
        this.articleLevelStatus$ = store.select(selectArticleLevelStatus);
        this.phraseNum$ = store.select(selectPhraseNum);
        this.phraseLevelStatus$ = store.select(selectPhraseLevelStatus);
        this.transcript$ = store.select(selectTranscript);
        this.isSpeaking$ = store.select(selectIsSpeaking);
        this.clarityScores$ = store.select(selectClarityScores);
        this.articleClarityScore$ = store.select(selectArticleClarityScore);

        this.subscription = this.clarityScores$.subscribe((clarityScores) => {
            if (clarityScores.length === 0) {
                return;
            }

            const correctWords = sumBy(clarityScores, ({ numCorrectWords }) => numCorrectWords);
            const totalWords = sumBy(clarityScores, ({ numTotalWords }) => numTotalWords);
            const average = correctWords / totalWords;

            console.log(`After phrase ${clarityScores.length}:
                correct = ${correctWords},
                total = ${totalWords},
                average = ${average}`);

            if (clarityScores.length === this.article.phrases.length) {
                this.store.dispatch(
                    saveClarityScore({
                        correctWords,
                        totalWords,
                    })
                );
            }
        });
    }

    ngOnInit(): void {
        // Initialise state with the current article.
        this.store.dispatch(initialise());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.article) {
            this.store.dispatch(changeArticle({ article: changes.article.currentValue }));
            this.store.dispatch(reset());
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /**
     * Returns the target phrase in this article.
     */
    get targetPhrase$(): Observable<string> {
        const { text } = this.article;
        return this.targetPhraseIndex$.pipe(map(({ startIndex, endIndex }) => text.slice(startIndex, endIndex).trim()));
    }

    get targetPhraseIndex$(): Observable<Phrase> {
        const { phrases } = this.article;
        return this.phraseNum$.pipe(map((phraseNum) => phrases[phraseNum]));
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

        this.transcript$.pipe(first()).subscribe((transcript) => {
            this.targetPhrase$.pipe(first()).subscribe((targetPhrase) => {
                const edits = this.articleComparisonService.compare(transcript, targetPhrase);
                const clarityScore = clarityScoreFromEdits(edits);

                this.store.dispatch(addClarityScore({ clarityScore }));
            });
        });
    }

    nextPhrase(): void {
        this.store.dispatch(nextPhrase());
    }
}
