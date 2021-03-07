import { Inject, Injectable, Type } from "@angular/core";
import { SPEECH_RECOGNITION } from "@ng-web-apis/common";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SpeechToTextService {
    transcript$: BehaviorSubject<string>;
    recording$: BehaviorSubject<boolean>;
    speechRecognition: SpeechRecognition;

    constructor(
        @Inject(SPEECH_RECOGNITION)
        private readonly SpeechRecognition: Type<SpeechRecognition>
    ) {
        this.speechRecognition = new this.SpeechRecognition();
        this.recording$ = new BehaviorSubject(false);
        this.transcript$ = new BehaviorSubject("");

        this.initialiseSpeechRecognition();
    }

    private initialiseSpeechRecognition(): void {
        this.speechRecognition.continuous = true;
        this.speechRecognition.interimResults = true;
        this.speechRecognition.addEventListener("result", (ev) => {
            const transcript = Array.from(ev.results)
                .map((result) => result[0].transcript)
                .join(" ");
            this.transcript$.next(transcript);
        });
    }

    get available(): boolean {
        return this.speechRecognition !== null;
    }

    start(): void {
        this.recording$.next(true);
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
