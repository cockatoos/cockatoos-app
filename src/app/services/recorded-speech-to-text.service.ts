import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
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
        return this.audioRecorder.available$.pipe(
            map((audioRecorderAvailable) => audioRecorderAvailable && this.speechToText.available)
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
