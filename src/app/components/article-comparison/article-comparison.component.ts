/// angular
import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";

/// rxjs
import { Observable, Subscription, throwError } from "rxjs";
import { catchError, first, map } from "rxjs/operators";

/// services
import { ArticleComparisonService } from "@services/article-comparison.service";

/// models
import { Article, Phrase } from "@models/article.model";
import { ClarityScore, clarityScoreFromEdits } from "@models/clarity-score.model";

/// ngrx
import { Store } from "@ngrx/store";
import { AppState } from "@state/app.state";
import {
    initialise,
    nextPhrase,
    startSpeaking,
    addClarityScore,
    changeArticle,
    saveClarityScore,
    saveAccentScore,
    clearArticleState,
    isReady,
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
import {
    selectPhraseLevelStatus,
    selectRecordingEncoding,
    selectTranscript,
} from "@state/selectors/phrase-level.selectors";

/// http
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "environments/environment";

/// material
import { MatSnackBar } from "@angular/material/snack-bar";

/// utils
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

    // Base64 encoding of the user's recording.
    recordingEncoding$: Observable<string>;

    private subscriptions: Subscription[];

    constructor(
        private store: Store<AppState>,
        private articleComparisonService: ArticleComparisonService,
        private http: HttpClient,
        private notificationSnackbar: MatSnackBar
    ) {
        // Listen to stateful content in the ngrx store.
        this.articleLevelStatus$ = store.select(selectArticleLevelStatus);
        this.phraseNum$ = store.select(selectPhraseNum);
        this.phraseLevelStatus$ = store.select(selectPhraseLevelStatus);
        this.transcript$ = store.select(selectTranscript);
        this.isSpeaking$ = store.select(selectIsSpeaking);
        this.clarityScores$ = store.select(selectClarityScores);
        this.articleClarityScore$ = store.select(selectArticleClarityScore);
        this.recordingEncoding$ = store.select(selectRecordingEncoding);
    }

    ngOnInit(): void {
        // Setup subscriptions to listeners.
        const statusListener = this.articleLevelStatus$.subscribe((status) => {
            switch (status) {
                case "CLARITY_SCORE_SAVED":
                    this.showNotification("SUCCESS", "Clarity scores saved.");
                    this.store.dispatch(isReady());
                    break;
                case "ACCENT_SCORE_SAVED":
                    this.showNotification("SUCCESS", "Accent scores saved.");
                    this.store.dispatch(isReady());
                    break;
                case "ERROR":
                    this.showNotification("ERROR", "An error has occurred.");
                    break;
            }
        });

        // Listen to the clarity score for each phrase: save clarity score to database when
        // user has finished reading all phrases.
        const clarityScoreListener = this.clarityScores$.subscribe((clarityScores) => {
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

        // Listen and post new recording encodings.
        const recordingEncodingListener = this.recordingEncoding$.subscribe((base64Encoding) => {
            if (base64Encoding === undefined) {
                return;
            }

            this.http
                .post(environment.convertApiUrl, { blob: base64Encoding }, { responseType: "text" })
                .pipe(
                    catchError((errorResponse: HttpErrorResponse) => {
                        if (errorResponse.error instanceof ErrorEvent) {
                            // A client-side or network error occurred. Handle it accordingly.
                            console.error("An error occurred:", errorResponse.error.message);
                        } else {
                            // The backend returned an unsuccessful response code.
                            // The response body may contain clues as to what went wrong.
                            console.error(
                                `Backend returned code ${errorResponse.status}, ` +
                                    `body was: ${JSON.stringify(errorResponse.error)}`
                            );
                        }
                        // Return an observable with a user-facing error message.
                        return throwError("Unable to process audio recording.");
                    })
                )
                .subscribe(
                    (res: any) => {
                        const parsedResult = JSON.parse(res);
                        console.log(parsedResult);
                        if (parsedResult.status === "success") {
                            console.log(`Accent score: ${parsedResult.score}`);
                            this.showNotification("SUCCESS", "Recording has been processed.");
                            this.store.dispatch(saveAccentScore({ score: Number(parsedResult.score) }));
                        } else {
                            this.showNotification("ERROR", parsedResult.reason);
                        }
                    },
                    (error) => {
                        this.showNotification("ERROR", error);
                    }
                );
        });

        this.subscriptions = [statusListener, recordingEncodingListener, clarityScoreListener];

        // Initialise state with the current article.
        this.store.dispatch(initialise());
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.article) {
            // Change article and reset the phrase-level UI for a new article.
            this.store.dispatch(changeArticle({ article: changes.article.currentValue }));
            this.store.dispatch(reset());
        }
    }

    ngOnDestroy(): void {
        this.store.dispatch(clearArticleState());
        this.store.dispatch(reset());
        this.subscriptions.forEach((listener) => listener.unsubscribe());
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

    private showNotification(type: "SUCCESS" | "ERROR", message: string, closeInMilliseconds = 2000): void {
        const prefix = type === "SUCCESS" ? "✅" : "⚠";
        this.notificationSnackbar.open(`${prefix} ${message}`, "Close", {
            duration: closeInMilliseconds,
        });
    }
}
