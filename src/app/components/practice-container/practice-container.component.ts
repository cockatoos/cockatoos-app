import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { ArticlesService } from "@services/articles.service";
import { initialise, nextArticle } from "@state/actions/practice-container-level.actions";
import { AppState } from "@state/app.state";
import { Status } from "@state/reducers/practice-container-level.reducer";
import {
    noMoreArticles,
    selectArticle,
    selectPracticeContainerLevelStatus,
} from "@state/selectors/practice-container-level.selectors";
import { Article } from "app/models/article.model";
import { Observable, of } from "rxjs";

@Component({
    selector: "app-practice-container",
    templateUrl: "./practice-container.component.html",
    styleUrls: ["./practice-container.component.sass"],
})
export class PracticeContainerComponent implements OnInit {
    // Component status, e.g. INIT|READY|ERROR.
    status$: Observable<Status>;

    // The current article to be used by the user.
    article$: Observable<Article>;

    // Boolean flag, true iff there are no more articles to read.
    noMoreArticles$: Observable<boolean>;

    constructor(public dialog: MatDialog, public articlesService: ArticlesService, private store: Store<AppState>) {
        this.status$ = store.select(selectPracticeContainerLevelStatus);
        this.article$ = store.select(selectArticle);
        this.noMoreArticles$ = store.select(noMoreArticles);
    }

    ngOnInit(): void {
        this.store.dispatch(initialise());
    }

    nextArticle(): void {
        this.store.dispatch(nextArticle());
    }
}
