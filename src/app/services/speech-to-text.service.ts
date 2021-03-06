import { Inject, Injectable } from "@angular/core";
import { SPEECH_RECOGNITION } from "@ng-web-apis/common";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SpeechToTextService {
    transcript$: BehaviorSubject<string>;
    recording$: BehaviorSubject<boolean>;

    constructor(
        @Inject(SPEECH_RECOGNITION)
        private readonly speechRecognition: SpeechRecognition
    ) {
        this.recording$ = new BehaviorSubject(false);
        this.transcript$ = new BehaviorSubject("");
    }

    get available(): boolean {
        return this.speechRecognition !== null;
    }

    start(): void {
        this.recording$.next(true);
        this.speechRecognition.onresult = (ev) => {
            const transcript = Array.from(ev.results)
                .map((result) => result[0].transcript)
                .join(" ");
            this.transcript$.next(transcript);
        };
        this.speechRecognition.start();
    }

    stop(): void {
        this.recording$.next(false);
        this.speechRecognition.stop();
    }

    reset(): void {
        this.transcript$.next("");
    }
}
