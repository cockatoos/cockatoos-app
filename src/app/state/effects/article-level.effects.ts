import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecordedSpeechToTextService } from "@services/recorded-speech-to-text.service";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";

import * as ArticleLevelActions from "@state/actions/article-level.actions";
import { EMPTY, of } from "rxjs";
import { TextToSpeechService } from "@services/text-to-speech.service";

@Injectable()
export class ArticleLevelEffects {
    initialise$ = createEffect(() =>
        this.actions$.pipe(
            mergeMap(() => {
                const textToSpeechIsAvailable = this.textToSpeechService.available;
                return this.recordedSpeechToTextService.available$.pipe(
                    map((speechToTextIsAvailable) => {
                        if (textToSpeechIsAvailable && speechToTextIsAvailable) {
                            return ArticleLevelActions.isReady();
                        } else {
                            return ArticleLevelActions.notSupported();
                        }
                    }),
                    catchError(() => EMPTY)
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private textToSpeechService: TextToSpeechService,
        private recordedSpeechToTextService: RecordedSpeechToTextService
    ) {}
}
