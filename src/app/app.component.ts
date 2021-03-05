import { Component } from "@angular/core";
import { TestAccentScoreData } from "@testing/testing-historical-score-data";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    title = "Cockatoos";

    public testHistoricalData = TestAccentScoreData;
}
