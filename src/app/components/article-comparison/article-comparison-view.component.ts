import { Component, OnInit, Input } from "@angular/core";
import { TextToSpeechService } from "app/services/text-to-speech.service";

//
// A document is represented by the full document text, along with
// the list of phrase indexes. Each phrase is represented by a start- and
// end-index. The index refers to the _character_ index, __not the word__.
//
interface Phrase {
    startIndex: number;
    endIndex: number;
}

interface Document {
    text: string;
    phrases: Phrase[];
}

@Component({
    selector: "app-article-comparison-view",
    templateUrl: "./article-comparison-view.component.html",
    styleUrls: ["./article-comparison-view.component.sass"],
})
export class ArticleComparisonViewComponent implements OnInit {
    @Input()
    document: Document;

    // Index of the current phrase.
    currentPhrase: number;

    constructor(public textToSpeech: TextToSpeechService) {}

    ngOnInit(): void {
        this.currentPhrase = 0;
    }

    /**
     * Returns the target phrase in this article.
     */
    get targetPhrase(): string {
        const { text, phrases } = this.document;
        const { startIndex, endIndex } = phrases[this.currentPhrase];
        return text.slice(startIndex, endIndex);
    }
}
