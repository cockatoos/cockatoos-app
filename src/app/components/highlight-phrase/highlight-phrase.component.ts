import { Component, Input } from "@angular/core";

@Component({
    selector: "app-highlight-phrase",
    templateUrl: "./highlight-phrase.component.html",
    styleUrls: ["./highlight-phrase.component.sass"],
})
export class HighlightPhraseComponent {
    @Input()
    text: string;

    @Input()
    startIndex: number;

    @Input()
    endIndex: number;

    constructor() {}

    get beforeHighlight(): string {
        return this.text.substring(0, this.startIndex);
    }

    get highlightPhrase(): string {
        return this.text.substring(this.startIndex, this.endIndex);
    }

    get afterHighlight(): string {
        return this.text.substring(this.endIndex, this.text.length);
    }

}
