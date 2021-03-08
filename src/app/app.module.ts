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
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from "@angular/material/sidenav";
import { ScoreChartsContainerComponent } from './components/score-charts-container/score-charts-container.component';
import { PracticeContainerComponent } from './components/practice-container/practice-container.component';
import { AnalyseDialogComponent } from './components/analyse-dialog/analyse-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        ScoreChartComponent,
        PhraseDiffComponent,
        ArticleComparisonComponent,
        ScoreChartsContainerComponent,
        PracticeContainerComponent,
        AnalyseDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HighchartsChartModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatGridListModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatSidenavModule,

    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
