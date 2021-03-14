///<reference path="../../../node_modules/@types/dom-mediacapture-record/index.d.ts"/>

import { Mp3MediaRecorder } from "mp3-mediarecorder";
import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";
import { catchError, map } from "rxjs/operators";


const worker = (typeof Worker !== 'undefined')
    ? new Worker('../app.worker', { type: 'module' })
    : undefined;

@Injectable({
    providedIn: "root",
})
export class AudioRecorderService {
    private mediaRecorder$: ReplaySubject<Mp3MediaRecorder>;
    private chunks: Blob[];

    // WebWorker that prepares MediaRecorder to encode in MPEG.
    private worker?: Worker;

    blob$: ReplaySubject<Blob>;

    constructor() {
        this.chunks = [];
        this.mediaRecorder$ = new ReplaySubject();
        this.blob$ = new ReplaySubject();
        this.worker = (typeof Worker !== 'undefined')
            ? new Worker('../app.worker', { type: 'module' })
            : undefined;

        this.initialiseMediaRecorder();
    }

    /**
     * Returns true iff the user gives permission for audio recording.
     */
     get available$(): Observable<boolean> {
        return this.mediaRecorder$.pipe(
            map((recorder) => true),
            catchError((error) => {
                console.error(error);
                return of(false);
            })
        );
    }

    /**
     * Signals the media recorder to begin recording.
     */
    start(): void {
        this.mediaRecorder$.subscribe((mediaRecorder) => {
            mediaRecorder.start();
        });
    }

    /**
     * Signals the media recorder to stop recording.
     */
    stop(): void {
        this.mediaRecorder$.subscribe((mediaRecorder) => {
            mediaRecorder.stop();
        });
    }

    /**
     * Resets the media recorder service.
     */
    reset(): void {
        this.chunks = [];
        this.blob$ = new ReplaySubject();
    }

    /**
     * Emits the @param blob to subscribers of the blob$ observable.
     */
    private handleBlob(blob: Blob): void {
        this.blob$.next(blob);
    }

    /**
     * Check user permissions for audio recording, and initialise the
     * MediaRecorder object.
     */
    private initialiseMediaRecorder(): void {
        if (navigator?.mediaDevices?.getUserMedia && this.worker) {
            // Get access to audio stream.
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    const mediaRecorder = new Mp3MediaRecorder(stream, {
                        worker: this.worker,
                    });

                    // Listen to data updates and keep track of audio blob.
                    mediaRecorder.addEventListener("dataavailable", (event: any) => {
                        this.chunks.push(event.data);
                    });

                    // Create and emit file blob on completion.
                    mediaRecorder.addEventListener("stop", () => {
                        this.handleBlob(
                            new Blob(this.chunks, {
                                type: "audio/mpeg"
                            })
                        );
                    });

                    // Emit the initialised media recorder.
                    this.mediaRecorder$.next(mediaRecorder);
                })
                .catch((error) => {
                    this.mediaRecorder$.error(error);
                });
        } else {
            this.mediaRecorder$.error("Audio recording not supported on device.");
        }
    }
}
