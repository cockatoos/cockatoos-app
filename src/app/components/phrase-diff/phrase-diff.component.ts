import { Component, Input } from "@angular/core";
import { Edit, ArticleComparisonService } from "../../services/article-comparison.service";

@Component({
    selector: "app-phrase-diff",
    templateUrl: "./phrase-diff.component.html",
    styleUrls: ["./phrase-diff.component.sass"],
})
export class PhraseDiffComponent {
    @Input()
    recordedPhrase: string;

    @Input()
    groundTruth: string;

    constructor(public diffService: ArticleComparisonService) {}

    /**
     * Returns the list of edits required to transform the @input recordedPhrase
     * into the @input groundTruth.
     */
    get edits(): Edit[] {
        return this.diffService.compare(this.recordedPhrase, this.groundTruth);
    }
}
