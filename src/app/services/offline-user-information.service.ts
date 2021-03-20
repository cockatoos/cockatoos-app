import { Injectable } from "@angular/core";
import { Score } from "@components/score-chart/score-chart.component";
import { TestAccentScoreData, TestClarityScoreData } from "@testing/testing-historical-score-data";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class OfflineUserInformationService {
    constructor() {}

    getClarityScores(): Observable<Score[]> {
        return of(TestClarityScoreData);
    }

    getAccentScores(): Observable<Score[]> {
        return of(TestAccentScoreData);
    }
}
