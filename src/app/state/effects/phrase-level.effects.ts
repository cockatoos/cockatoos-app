import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecordedSpeechToTextService } from "@services/recorded-speech-to-text.service";
import { catchError, map, mergeMap } from "rxjs/operators";

import * as PhraseLevelActions from "@state/actions/phrase-level.actions";
import { EMPTY } from "rxjs";

@Injectable()
export class PhraseLevelEffects {
    startRecording$ = createEffect(() =>
        this.actions$.pipe(
            ofType("Start Recording"),
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
            ofType("Stop Recording"),
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
            ofType("Next Phrase"),
            map(() => {
                this.recordedSpeechToTextService.reset();
                return PhraseLevelActions.reset();
            }),
            catchError(() => EMPTY)
        )
    );

    constructor(private actions$: Actions, private recordedSpeechToTextService: RecordedSpeechToTextService) {}
}
