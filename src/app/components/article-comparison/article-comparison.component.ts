import { Component, OnInit, Input } from "@angular/core";
import { TextToSpeechService } from "@services/text-to-speech.service";
import { Observable, of } from "rxjs";

//
// A document is represented by the full document text, along with
// the list of phrase indexes. Each phrase is represented by a start- and
// end-index. The index refers to the _character_ index, __not the word__.
//
interface Phrase {
    startIndex: number;
    endIndex: number;
}

export interface Document {
    text: string;
    phrases: Phrase[];
}

@Component({
    selector: "app-article-comparison",
    templateUrl: "./article-comparison.component.html",
    styleUrls: ["./article-comparison.component.sass"],
})
export class ArticleComparisonComponent implements OnInit {
    @Input()
    document: Document;

    // Index of the current phrase.
    currentPhrase: number;

    // TODO: will be obtained from the SpeechToTextService
    recordedPhrase: Observable<string>;

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
