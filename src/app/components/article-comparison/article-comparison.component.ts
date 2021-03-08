import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

import { Article } from "@models/article.model";
import { Store } from "@ngrx/store";
import { AppState } from "@state/app.state";
import { initialise, nextPhrase, startSpeaking } from "@state/actions/article-level.actions";
import { first, map } from "rxjs/operators";
import { startRecording, stopRecording } from "@state/actions/phrase-level.actions";
import { Status as ArticleLevelStatus } from "@state/reducers/article-level.reducer";
import { Status as PhraseLevelStatus } from "@state/reducers/phrase-level.reducer";

@Component({
    selector: "app-article-comparison",
    templateUrl: "./article-comparison.component.html",
    styleUrls: ["./article-comparison.component.sass"],
})
export class ArticleComparisonComponent implements OnInit {
    @Input()
    article: Article;

    articleLevelStatus$: Observable<ArticleLevelStatus>;
    phraseLevelStatus$: Observable<PhraseLevelStatus>;
    phraseNum$: Observable<number>;
    transcript$: Observable<string>;
    isSpeaking$: Observable<boolean>;

    constructor(private store: Store<AppState>) {
        this.phraseNum$ = store.select(({ articleLevel }) => articleLevel.phraseNum);
        this.transcript$ = store.select(({ phraseLevel }) => phraseLevel.transcript);
        this.articleLevelStatus$ = store.select(({ articleLevel }) => articleLevel.status);
        this.phraseLevelStatus$ = store.select(({ phraseLevel }) => phraseLevel.status);
        this.isSpeaking$ = store.select(({ articleLevel }) => articleLevel.isSpeaking);
    }

    ngOnInit(): void {
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
