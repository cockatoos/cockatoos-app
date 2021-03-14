import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AnalyseDialogComponent } from "@components/analyse-dialog/analyse-dialog.component";
import { ArticlesService } from "@services/articles.service";
import { Article } from "app/models/article.model";
import { Observable } from "rxjs";

@Component({
    selector: "app-practice-container",
    templateUrl: "./practice-container.component.html",
    styleUrls: ["./practice-container.component.sass"],
})
export class PracticeContainerComponent implements OnInit {
    article$: Observable<Article>;

    constructor(public dialog: MatDialog, public articlesService: ArticlesService) {
        this.article$ = articlesService.getDocument();
    }

    ngOnInit(): void {}

    public openDialog(): void {
        const dialogRef = this.dialog.open(AnalyseDialogComponent);
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log(`Dialog result: ${result}`);
        // });
    }
}
