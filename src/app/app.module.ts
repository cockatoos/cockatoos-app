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
import { ScoreChartsContainerComponent } from "./components/score-charts-container/score-charts-container.component";
import { PracticeContainerComponent } from "./components/practice-container/practice-container.component";
import { HighlightPhraseComponent } from "@components/highlight-phrase/highlight-phrase.component";

/// material
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";

/// firestore
import { AngularFireModule } from "@angular/fire";
import { AngularFireAnalyticsModule } from "@angular/fire/analytics";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

/// ngrx
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { articleLevelReducer } from "@state/reducers/article-level.reducer";
import { phraseLevelReducer } from "@state/reducers/phrase-level.reducer";
import { ArticleLevelEffects } from "@state/effects/article-level.effects";
import { PhraseLevelEffects } from "@state/effects/phrase-level.effects";
import { practiceContainerLevelReducer } from "@state/reducers/practice-container-level.reducer";
import { PracticeContainerLevelEffects } from "@state/effects/practice-container-level.effects";

/// full page
import { AngularFullpageModule } from "@fullpage/angular-fullpage";
import { HomePageContainerComponent } from "@components/home-page-container/home-page-container.component";
import { MainAppContainerComponent } from "./components/main-app-container/main-app-container.component";

/// HTTP
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        ScoreChartComponent,
        PhraseDiffComponent,
        ArticleComparisonComponent,
        ScoreChartsContainerComponent,
        PracticeContainerComponent,
        HomePageContainerComponent,
        MainAppContainerComponent,
        HighlightPhraseComponent,
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
            practiceContainerLevel: practiceContainerLevelReducer,
        }),
        EffectsModule.forRoot([ArticleLevelEffects, PhraseLevelEffects, PracticeContainerLevelEffects]),
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatSidenavModule,
        MatSnackBarModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        AngularFirestoreModule,
        AngularFullpageModule,
        HttpClientModule,
    ],
    providers: [HttpClientModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
