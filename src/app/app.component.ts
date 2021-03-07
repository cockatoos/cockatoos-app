import { Component } from "@angular/core";
import { TestAccentScoreData } from "@testing/testing-historical-score-data";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
    public testHistoricalData = TestAccentScoreData;
}
