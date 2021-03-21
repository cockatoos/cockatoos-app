import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";

import { Article, Phrase } from "@models/article.model";

import { Store } from "@ngrx/store";
import { AppState } from "@state/app.state";
import { initialise, nextPhrase, startSpeaking } from "@state/actions/article-level.actions";
import { startRecording, stopRecording } from "@state/actions/phrase-level.actions";
import { Status as ArticleLevelStatus } from "@state/reducers/article-level.reducer";
import { Status as PhraseLevelStatus } from "@state/reducers/phrase-level.reducer";
import { selectArticleLevelStatus, selectIsSpeaking, selectPhraseNum } from "@state/selectors/article-level.selectors";
import {
    selectPhraseLevelStatus,
    selectRecordingEncoding,
    selectTranscript,
} from "@state/selectors/phrase-level.selectors";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment";

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

    // Base64 encoding of the user's recording.
    recordingEncoding$: Observable<string>;

    // Web server/Azure function endpoint for converting recording.
    // TODO: Any better place for this to live?
    convertApiUrl: any;

    constructor(private store: Store<AppState>, private http: HttpClient) {
        this.articleLevelStatus$ = store.select(selectArticleLevelStatus);
        this.phraseNum$ = store.select(selectPhraseNum);
        this.phraseLevelStatus$ = store.select(selectPhraseLevelStatus);
        this.transcript$ = store.select(selectTranscript);
        this.isSpeaking$ = store.select(selectIsSpeaking);
        this.recordingEncoding$ = store.select(selectRecordingEncoding);
        this.recordingEncoding$.subscribe((base64Encoding) => {
            if (base64Encoding === undefined) {
                return;
            }

            this.http.post(environment.convertApiUrl, { blob: base64Encoding }, { responseType: "text" }).subscribe((res) => {
                console.log(res);
            });
            // TODO: clean-up
            console.log(base64Encoding);
        });
    }

    ngOnInit(): void {
        // Initialise state with the current article.
        this.store.dispatch(initialise({ article: this.article }));
    }

    /**
     * Returns the target phrase in this article.
     */
    get targetPhrase$(): Observable<string> {
        const { text } = this.article;
        return this.targetPhraseIndex$.pipe(
            map(({ startIndex, endIndex }) => text.slice(startIndex, endIndex).trim())
        );
    }

    get targetPhraseIndex$(): Observable<Phrase> {
        const { phrases } = this.article;
        return this.phraseNum$.pipe(
            map((phraseNum) => phrases[phraseNum])
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
