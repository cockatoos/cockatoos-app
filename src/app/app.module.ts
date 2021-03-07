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

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DataConnectorComponent } from './components/data-connector/data-connector.component';

@NgModule({
    declarations: [
        AppComponent,
        ScoreChartComponent,
        PhraseDiffComponent,
        ArticleComparisonComponent,
        DataConnectorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HighchartsChartModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatGridListModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        AngularFirestoreModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
