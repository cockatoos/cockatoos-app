import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RecordedSpeechToTextService } from "@services/recorded-speech-to-text.service";
import { catchError, map, mergeMap } from "rxjs/operators";

import * as PracticeContainerLevelActions from "@state/actions/practice-container-level.actions";
import { EMPTY } from "rxjs";
import { ArticlesService } from "@services/articles.service";

@Injectable()
export class PracticeContainerLevelEffects {
    initialise$ = createEffect(() =>
        this.actions$.pipe(
            ofType("[Practice Container] Init"),
            mergeMap(() => {
                return this.articlesService.articles$.pipe(
                    map((articles) => PracticeContainerLevelActions.ready({ articles })),
                    catchError(() => EMPTY)
                );
            })
        )
    );

    constructor(private actions$: Actions, private articlesService: ArticlesService) {}
}
