import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import * as Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import { parseISO } from "date-fns";
import { mean } from "lodash";
import HighchartsBoost from "highcharts/modules/boost";

more(Highcharts);
HighchartsBoost(Highcharts);

export interface Score {
    date: Date;
    score: number;
}

@Component({
    selector: "app-score-chart",
    templateUrl: "./score-chart.component.html",
    styleUrls: ["./score-chart.component.sass"],
})
export class ScoreChartComponent implements OnChanges, OnInit {
    @Input()
    public historicalData: Score[];

    @Input()
    public label: string;

    public Highcharts: typeof Highcharts = Highcharts;
    public height: number;
    public width: number;

    get averageValue(): string {
        return this.historicalData ? mean(this.historicalData.map(({ score }) => score)).toPrecision(3) : null;
    }

    get currentValue(): string {
        const today = new Date();
        const todayScore = this.historicalData.filter(
            ({ date }) =>
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
        );

        if (todayScore.length !== 1) {
            return null;
        }

        return todayScore[0].score.toPrecision(3);
    }

    public chartOptions: Highcharts.Options = {
        title: {
            text: "",
        },

        yAxis: {
            title: {
                text: `Score`,
            },
        },

        xAxis: {
            type: "datetime",
            labels: {
                formatter(): string {
                    return Highcharts.dateFormat("%d/%m", this.value);
                },
            },
        },
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            layout: "horizontal",
                            align: "center",
                            verticalAlign: "bottom",
                        },
                    },
                },
            ],
        },
        series: [],
        chart: {
            type: 'column',
            reflow: true,
            width: 350,
            height: 300,
        },
    };

    ngOnInit(): void {
        this.height = 20;
        this.width = 20;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.historicalData) {
            this.chartOptions.series = [
                {
                    name: `${this.label} Scores`,
                    type: "column",
                    data: changes.historicalData.currentValue.map(({ date, score }: Score) => [date.getTime(), score]),
                },
            ];
        }
    }
}
