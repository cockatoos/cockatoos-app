import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/// routing
import { AppRoutingModule } from "./app-routing.module";

/// charts
import { HighchartsChartModule } from "highcharts-angular";

/// components
import { AppComponent } from "./app.component";
import { ScoreChartComponent } from "@components/score-chart/score-chart.component";
import { ArticleComparisonComponent } from "@components/article-comparison/article-comparison.component";
import { PhraseDiffComponent } from "@components/phrase-diff/phrase-diff.component";
import { ScoreChartsContainerComponent } from './components/score-charts-container/score-charts-container.component';
import { PracticeContainerComponent } from './components/practice-container/practice-container.component';
import { AnalyseDialogComponent } from './components/analyse-dialog/analyse-dialog.component';
import { HighlightPhraseComponent } from '@components/highlight-phrase/highlight-phrase.component';
import { DataConnectorComponent } from './components/data-connector/data-connector.component';

/// material
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

/// firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

/// ngrx
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { articleLevelReducer } from "@state/reducers/article-level.reducer";
import { phraseLevelReducer } from "@state/reducers/phrase-level.reducer";
import { ArticleLevelEffects } from "@state/effects/article-level.effects";
import { PhraseLevelEffects } from "@state/effects/phrase-level.effects";

// HTTP
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations: [
        AppComponent,
        ScoreChartComponent,
        PhraseDiffComponent,
        ArticleComparisonComponent,
        ScoreChartsContainerComponent,
        PracticeContainerComponent,
        AnalyseDialogComponent,
        HighlightPhraseComponent,
        DataConnectorComponent,
    ],
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
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatSidenavModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        AngularFirestoreModule,
        HttpClientModule,
    ],
    providers: [HttpClientModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
