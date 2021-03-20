import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TestAccentScoreData } from "@testing/testing-historical-score-data";
import { HighchartsChartModule } from "highcharts-angular";

import { ScoreChartComponent } from "./score-chart.component";

describe("ScoreChartComponent", () => {
    let component: ScoreChartComponent;
    let fixture: ComponentFixture<ScoreChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScoreChartComponent],
            imports: [HighchartsChartModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScoreChartComponent);
        component = fixture.componentInstance;
        component.historicalData = TestAccentScoreData;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
