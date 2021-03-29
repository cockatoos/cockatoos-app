import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecordedSpeechToTextService } from "@services/recorded-speech-to-text.service";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";

import * as PhraseLevelActions from "@state/actions/phrase-level.actions";
import { EMPTY } from "rxjs";

@Injectable()
export class PhraseLevelEffects {
    startRecording$ = createEffect(() =>
        this.actions$.pipe(
            ofType("[Phrase] Start Recording"),
            mergeMap(() => {
                this.recordedSpeechToTextService.start();
                return this.recordedSpeechToTextService.transcript$.pipe(
                    map((transcript) => PhraseLevelActions.liveTranscript({ transcript })),
                    catchError(() => EMPTY)
                );
            })
        )
    );

    stopRecording$ = createEffect(() =>
        this.actions$.pipe(
            ofType("[Phrase] Stop Recording"),
            mergeMap(() => {
                this.recordedSpeechToTextService.stop();
                return this.recordedSpeechToTextService.blob$.pipe(
                    map((blob) => PhraseLevelActions.blobAvailable({ blob })),
                    catchError(() => EMPTY)
                );
            })
        )
    );

    nextPhrase$ = createEffect(() =>
        this.actions$.pipe(
            ofType("[Article] Next Phrase"),
            map(() => {
                this.recordedSpeechToTextService.reset();
                return PhraseLevelActions.reset();
            }),
            catchError(() => EMPTY)
        )
    );

    encodePhrase$ = createEffect(() =>
        this.actions$.pipe(
            ofType("[Phrase] Blob Available"),
            switchMap(({ blob }: { blob: Blob}) => {
                //// Uncomment to download the audio file...
                // const url = URL.createObjectURL(blob);
                // const a = document.createElement("a");
                // a.setAttribute("style", "display: none;");
                // a.setAttribute("href", url);
                // a.setAttribute("download", "test.wbm");
                // document.body.appendChild(a);
                // a.click();
                // URL.revokeObjectURL(url);

                return this.recordedSpeechToTextService.encodeBlob(blob)
                    .pipe(
                        map((encoding) => PhraseLevelActions.encodingAvailable({ encoding }))
                    );
            })
        )
    );

    constructor(private actions$: Actions, private recordedSpeechToTextService: RecordedSpeechToTextService) {}
}
