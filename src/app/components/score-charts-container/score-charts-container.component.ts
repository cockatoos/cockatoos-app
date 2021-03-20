import { Component, OnInit } from "@angular/core";
import { Score } from "@components/score-chart/score-chart.component";
import { OfflineUserInformationService } from "@services/offline-user-information.service";
import { UserInformationService } from "@services/user-information.service";
import { TestAccentScoreData, TestClarityScoreData } from "@testing/testing-historical-score-data";
import { Observable } from "rxjs";

@Component({
    selector: "app-score-charts-container",
    templateUrl: "./score-charts-container.component.html",
    styleUrls: ["./score-charts-container.component.sass"],
})
export class ScoreChartsContainerComponent implements OnInit {
    accentData$: Observable<Score[]>;
    clarityData$: Observable<Score[]>;

    constructor(
        private userInformationService: UserInformationService,
        private mockUserInformationService: OfflineUserInformationService
    ) {
        // NOTE: change this to 'mockUserInformation' if you want to use test data.
        const service = this.userInformationService;

        this.accentData$ = service.getAccentScores();
        this.clarityData$ = service.getClarityScores();
    }

    ngOnInit(): void {}
}
