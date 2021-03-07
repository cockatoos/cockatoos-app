///<reference path="../../../node_modules/@types/dom-mediacapture-record/index.d.ts"/>

import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";
import { catchError, map } from "rxjs/operators";
@Injectable({
    providedIn: "root",
})
export class AudioRecorderService {
    private mediaRecorder$: ReplaySubject<MediaRecorder>;
    private chunks: Blob[];

    constructor() {
        this.chunks = [];
        this.mediaRecorder$ = new ReplaySubject();
        this.initialiseMediaRecorder();
    }

    private initialiseMediaRecorder(): void {
        if (navigator?.mediaDevices?.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: true,
                })
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream, {
                        mimeType: "audio/webm;codecs=opus",
                    });
                    mediaRecorder.addEventListener("dataavailable", ({ data }) => {
                        this.chunks.push(data);
                    });
                    mediaRecorder.addEventListener("stop", () => {
                        this.handleBlob(
                            new Blob(this.chunks, {
                                type: "audio/ogg; codecs=opus",
                            })
                        );
                    });

                    this.mediaRecorder$.next(mediaRecorder);
                })
                .catch((error) => {
                    this.mediaRecorder$.error(error);
                });
        } else {
            this.mediaRecorder$.error("Audio recording not supported on device.");
        }
    }

    get available$(): Observable<boolean> {
        return this.mediaRecorder$.pipe(
            map((recorder) => true),
            catchError((error) => of(false))
        );
    }

    start(): void {
        this.mediaRecorder$.subscribe((mediaRecorder) => {
            mediaRecorder.start();
        });
    }

    stop(): void {
        this.mediaRecorder$.subscribe((mediaRecorder) => {
            mediaRecorder.stop();
        });
    }

    reset(): void {
        this.chunks = [];
    }

    private handleBlob(blob: Blob): void {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("style", "display: none;");
        a.setAttribute("href", url);
        a.setAttribute("download", "test.wbm");
        document.body.appendChild(a);
        a.click();
        // URL.revokeObjectURL(url);
    }
}
