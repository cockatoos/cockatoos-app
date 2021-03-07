import { Injectable } from "@angular/core";
import { BehaviorSubject, merge, Observable, of } from "rxjs";
import { reduce } from "rxjs/operators";
import { AudioRecorderService } from "./audio-recorder.service";
import { SpeechToTextService } from "./speech-to-text.service";

@Injectable({
    providedIn: "root",
})
export class RecordedSpeechToTextService {
    constructor(
        private readonly audioRecorder: AudioRecorderService,
        private readonly speechToText: SpeechToTextService
    ) {}

    get transcript$(): BehaviorSubject<string> {
        return this.speechToText.transcript$;
    }

    get available$(): Observable<boolean> {
        return merge(this.audioRecorder.available$, of(this.speechToText.available)).pipe(
            reduce((acc, val) => acc && val, true)
        );
    }

    start(): void {
        this.audioRecorder.start();
        this.speechToText.start();
    }

    get recording$(): BehaviorSubject<boolean> {
        return this.speechToText.recording$;
    }

    stop(): void {
        this.audioRecorder.stop();
        this.speechToText.stop();
    }

    get blob$(): Observable<Blob> {
        return this.audioRecorder.blob$;
    }

    reset(): void {
        this.audioRecorder.reset();
        this.speechToText.reset();
    }
}
