import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScoreChartComponent } from "@components/score-chart/score-chart.component";
import { HighchartsChartModule } from "highcharts-angular";

import { ArticleComparisonComponent } from "@components/article-comparison/article-comparison.component";
import { PhraseDiffComponent } from "@components/phrase-diff/phrase-diff.component";

@NgModule({
    declarations: [
        AppComponent,
        ScoreChartComponent,
        PhraseDiffComponent,
        ArticleComparisonComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HighchartsChartModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
