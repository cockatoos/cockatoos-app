import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScoreChartComponent } from "@components/score-chart/score-chart.component";
import { HighchartsChartModule } from "highcharts-angular";

import { ArticleComparisonComponent } from "@components/article-comparison/article-comparison.component";
import { PhraseDiffComponent } from "@components/phrase-diff/phrase-diff.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { articleLevelReducer } from "@state/reducers/article-level.reducer";
import { phraseLevelReducer } from "@state/reducers/phrase-level.reducer";
import { ArticleLevelEffects } from "@state/effects/article-level.effects";
import { PhraseLevelEffects } from "@state/effects/phrase-level.effects";

@NgModule({
    declarations: [AppComponent, ScoreChartComponent, PhraseDiffComponent, ArticleComparisonComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HighchartsChartModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        StoreModule.forRoot({
            articleLevel: articleLevelReducer,
            phraseLevel: phraseLevelReducer,
        }),
        EffectsModule.forRoot([ArticleLevelEffects, PhraseLevelEffects]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
