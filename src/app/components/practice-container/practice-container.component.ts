import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AnalyseDialogComponent } from "@components/analyse-dialog/analyse-dialog.component";
import { ArticlesService } from "@services/articles.service";
import { TEST_ARTICLE } from "@testing/testing-article-data";
import { Article } from "app/models/article.model";
import { Observable, of } from "rxjs";

@Component({
    selector: "app-practice-container",
    templateUrl: "./practice-container.component.html",
    styleUrls: ["./practice-container.component.sass"],
})
export class PracticeContainerComponent implements OnInit {
    article$: Observable<Article>;

    constructor(public dialog: MatDialog, public articlesService: ArticlesService) {
        this.article$ = articlesService.getDocument();
        // this.article$ = of(TEST_ARTICLE);
    }

    ngOnInit(): void {}
}
