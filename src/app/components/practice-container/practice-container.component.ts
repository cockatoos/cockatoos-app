import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AnalyseDialogComponent } from "@components/analyse-dialog/analyse-dialog.component";
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
    status$: Observable<Status>;
    article$: Observable<Article>;
    noMoreArticles$: Observable<boolean>;

    constructor(public dialog: MatDialog, public articlesService: ArticlesService, private store: Store<AppState>) {
        this.status$ = store.select(selectPracticeContainerLevelStatus);
        this.article$ = store.select(selectArticle);
        this.noMoreArticles$ = store.select(noMoreArticles);
    }

    nextArticle(): void {
        this.store.dispatch(nextArticle());
    }

    ngOnInit(): void {
        this.store.dispatch(initialise());
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(AnalyseDialogComponent);
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log(`Dialog result: ${result}`);
        // });
    }
}
