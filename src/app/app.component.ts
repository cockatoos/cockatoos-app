import { Component } from "@angular/core";
import { TestAccentScoreData, TestClarityScoreData } from "@testing/testing-historical-score-data";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    title = "Cockatoos";

    public testAccentData = TestAccentScoreData;
    public testClarityData = TestClarityScoreData;
}
