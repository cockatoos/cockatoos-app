import { Component, OnInit, Input } from "@angular/core";
import { TextToSpeechService } from "app/services/text-to-speech.service";

interface Phrase {
    startIndex: number
    endIndex: number
}

interface Document {
    text: string
    phrases: Phrase[]
}

@Component({
    selector: "app-article-comparison-view",
    templateUrl: "./article-comparison-view.component.html",
    styleUrls: ["./article-comparison-view.component.sass"],
})
export class ArticleComparisonViewComponent implements OnInit {

    @Input()
    public document: Document

    public currentPhrase: number = 0;

    constructor(
        public textToSpeech: TextToSpeechService
    ) {}

    ngOnInit(): void {}

    get targetPhrase(): string {
        const { text, phrases } = this.document;
        const { startIndex, endIndex } = phrases[this.currentPhrase];
        return text.slice(startIndex, endIndex);
    }

}
