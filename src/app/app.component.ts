import { Component } from "@angular/core";
import { TestAccentScoreData, TestClarityScoreData } from "@testing/testing-historical-score-data";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    title = "Cockatoos";

    document = {
        text: "Hello world",
        phrases: [
            {
                startIndex: 0,
                endIndex: 10,
            },
        ],
    };

    public testAccentData = TestAccentScoreData;
    public testClarityData = TestClarityScoreData;
}
