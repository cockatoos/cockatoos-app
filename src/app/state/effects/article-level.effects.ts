import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecordedSpeechToTextService } from "@services/recorded-speech-to-text.service";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";

import * as ArticleLevelActions from "@state/actions/article-level.actions";
import { EMPTY } from "rxjs";
import { TextToSpeechService } from "@services/text-to-speech.service";
import { UserInformationService } from "@services/user-information.service";

@Injectable()
export class ArticleLevelEffects {
    initialise$ = createEffect(() =>
        this.actions$.pipe(
            ofType("[Article] Initialise"),
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
            ofType("[Article] Start Speaking"),
            switchMap(({ text }) => {
                this.textToSpeechService.speak(text);
                return this.textToSpeechService.speaking$.pipe(
                    map((isSpeaking) => ArticleLevelActions.speakingStateChange({ isSpeaking }))
                );
            })
        )
    );

    saveClarityScore$ = createEffect(() =>
        this.actions$.pipe(
            ofType("[Article] Save Clarity Score"),
            switchMap(({ correctWords, totalWords }) => {
                return this.userInformationService
                    .saveClarityScore({
                        numCorrectWords: correctWords,
                        numTotalWords: totalWords,
                    })
                    .pipe(
                        map((success) => {
                            if (success) {
                                return ArticleLevelActions.clarityScoreSaved();
                            } else {
                                return ArticleLevelActions.error({ errorMessage: "Unable to save clarity score." });
                            }
                        })
                    );
            })
        )
    );

    saveAccentScore$ = createEffect(() =>
        this.actions$.pipe(
            ofType("[Article] Save Accent Score"),
            switchMap(({ score }) => {
                return this.userInformationService.saveAccentScore(score).pipe(
                    map((success) => {
                        if (success) {
                            return ArticleLevelActions.accentScoreSaved();
                        } else {
                            return ArticleLevelActions.error({ errorMessage: "Unable to save accent score." });
                        }
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private textToSpeechService: TextToSpeechService,
        private recordedSpeechToTextService: RecordedSpeechToTextService,
        private userInformationService: UserInformationService
    ) {}
}
