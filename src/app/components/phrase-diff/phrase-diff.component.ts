import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Edit, ArticleComparisonService } from "../../services/article-comparison.service";

export interface PhraseDiffProps {
    edits: Edit[];
}

@Component({
    selector: "app-phrase-diff",
    templateUrl: "./phrase-diff.component.html",
    styleUrls: ["./phrase-diff.component.sass"],
})
export class PhraseDiffComponent implements OnInit {
    @Input() recordedPhrase: Observable<string>;
    @Input() groundTruth: string;

    edits: Edit[] = [];

    constructor(public diffService: ArticleComparisonService) {}

    ngOnInit(): void {
        this.recordedPhrase.subscribe((recordedPhrase) => {
            this.edits = this.diffService.compare(recordedPhrase, this.groundTruth);
        });
    }
}
