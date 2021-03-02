import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScoreChartComponent } from "@components/score-chart/score-chart.component";
import { HighchartsChartModule } from "highcharts-angular";
import { PhraseDiffComponent } from "@components/phrase-diff/phrase-diff.component";

@NgModule({
    declarations: [AppComponent, ScoreChartComponent, PhraseDiffComponent],
    imports: [BrowserModule, AppRoutingModule, HighchartsChartModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
