import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecordedSpeechToTextService } from "@services/recorded-speech-to-text.service";
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";

import * as ArticleLevelActions from "@state/actions/article-level.actions";
import { EMPTY } from "rxjs";
import { TextToSpeechService } from "@services/text-to-speech.service";

@Injectable()
export class ArticleLevelEffects {
    initialise$ = createEffect(() =>
        this.actions$.pipe(
            ofType("Initialise Article"),
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

    startSpeaking$ = createEffect(() =>
        this.actions$.pipe(
            ofType("Start Speaking"),
            switchMap(({ text }) => {
                this.textToSpeechService.speak(text);
                return this.textToSpeechService.speaking$.pipe(
                    map((isSpeaking) => ArticleLevelActions.speakingStateChange({ isSpeaking }))
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
