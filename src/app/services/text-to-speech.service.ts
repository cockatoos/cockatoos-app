import { Inject, Injectable } from "@angular/core";
import { SPEECH_SYNTHESIS } from "@ng-web-apis/common";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TextToSpeechService {

    // Exposes the speaking state, i.e. true iff speaking.
    speaking$: Observable<boolean>;

    constructor(
        @Inject(SPEECH_SYNTHESIS)
        private readonly speechSynthesis: SpeechSynthesis
    ) {
        this.speaking$ = of(false);
    }

    /**
     * Returns true iff the Web Speech API is available on the user's browser.
     */
    get available(): boolean {
        return this.speechSynthesis !== undefined;
    }

    /**
     * Perform text-to-speech on the @param text.
     */
    speak(text: string): void {
        this.speaking$ = new Observable((subscriber) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.addEventListener("start", () => {
                subscriber.next(true);
            });
            utterance.addEventListener("end", () => {
                subscriber.next(false);
            });

            this.speechSynthesis.speak(utterance);
        });
    }

}
