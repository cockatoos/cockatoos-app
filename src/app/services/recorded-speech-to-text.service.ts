import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { AudioRecorderService } from "./audio-recorder.service";
import { SpeechToTextService } from "./speech-to-text.service";

//
// Wrapper service around the AudioRecorder and SpeechToText,
// in order to synchronise the speech-to-text recognition and the
// audio recording for the accent score prediction.
//

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

    get recording$(): BehaviorSubject<boolean> {
        return this.speechToText.recording$;
    }

    get blob$(): Observable<Blob> {
        return this.audioRecorder.blob$;
    }

    start(): void {
        this.audioRecorder.start();
        this.speechToText.start();
    }

    stop(): void {
        this.audioRecorder.stop();
        this.speechToText.stop();
    }

    reset(): void {
        this.audioRecorder.reset();
        this.speechToText.reset();
    }

    encodeBlob(blob: Blob): Observable<string> {
        const encoding$ = new Subject<string>();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = (): void => {
            const base64 = (reader.result as string).split(",")[1];
            encoding$.next(base64);
        }
        return encoding$;
    }
}
