import { Injectable } from "@angular/core";
import { of, ReplaySubject } from "rxjs";
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
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.ondataavailable = (ev) => {
                        this.chunks.push(ev.data);
                    };
                    this.mediaRecorder$.next(mediaRecorder);
                })
                .catch((error) => {
                    this.mediaRecorder$.error(error);
                });
        } else {
            this.mediaRecorder$.error("Audio recording not supported on device.");
        }
    }

    get available$() {
        return this.mediaRecorder$.pipe(
            map((val) => true),
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
            this.processChunks();
        });
    }

    reset(): void {
        this.chunks = [];
    }

    private processChunks(): void {
        const blob = new Blob(this.chunks, {
            type: "audio/ogg; codecs=opus",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("style", "display: none;");
        a.href = url;
        a.download = "test.wbm";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    }
}
