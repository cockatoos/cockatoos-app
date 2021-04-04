import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import * as Highcharts from "highcharts";
import more from "highcharts/highcharts-more";
import { mean } from "lodash";
import HighchartsBoost from "highcharts/modules/boost";
import HCSoldGauge from "highcharts/modules/solid-gauge";

more(Highcharts);
HighchartsBoost(Highcharts);
HCSoldGauge(Highcharts);

export interface Score {
    date: Date;
    score: number;
}

@Component({
    selector: "app-score-chart",
    templateUrl: "./score-chart.component.html",
    styleUrls: ["./score-chart.component.sass"],
})
export class ScoreChartComponent implements OnChanges {
    @Input()
    historicalData: Score[];

    @Input()
    label: string;

    Highcharts: typeof Highcharts = Highcharts;
    height: number;
    width: number;

    get averageValue(): string {
        return this.historicalData ? mean(this.historicalData.map(({ score }) => score * 100)).toFixed() : null;
    }

    public gaugeOptions: Highcharts.Options = {
        title: {
            text: "Daily Score",
            style: { color: "#304d86", fontSize: "20px" },
        },
        yAxis: {
            stops: [
                [0.2, "#DF5353"], // red
                [0.5, "#DDDF0D"], // yellow
                [0.8, "#55BF3B"], // green
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickPositions: [],
            min: 0,
            max: 100,
            title: {
                text: undefined,
            },
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    borderWidth: 0,
                    useHTML: true,
                },
                rounded: true,
                linecap: "round",
            },
        },
        pane: {
            center: ["50%", "50%"],
            size: "160%",
            startAngle: -90,
            endAngle: 270,
            background: [
                {
                    // Track for Exercise
                    outerRadius: "62%",
                    innerRadius: "38%",
                    backgroundColor: "#fff6f6",
                    borderWidth: 0,
                },
            ],
        },
        series: [],
        tooltip: {
            enabled: false,
        },
        chart: {
            reflow: true,
            height: 200,
            width: 200,
        },
    };

    public chartOptions: Highcharts.Options = {
        title: {
            text: "",
        },

        yAxis: {
            title: {
                text: `Score`,
            },
            max: 100,
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
            type: "column",
            reflow: true,
            // width: 500,
            // height: 500,
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    symbol: "circle",
                    radius: 8,
                },
            },
        },
    };

    /**
     * Compute today's current value from the @param historicalData,
     * which is possibly null.
     */
    currentValueFrom(historicalData: Score[]): number | null {
        const today = new Date();
        const todayScore = historicalData.filter(
            ({ date }) =>
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
        );

        if (todayScore.length !== 1) {
            return null;
        }

        return todayScore[0].score * 100;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.historicalData) {
            const latestHistoricalData = changes.historicalData.currentValue;
            console.log(this.label, latestHistoricalData);

            this.chartOptions.series = [
                {
                    name: `${this.label} Scores`,
                    type: "line",
                    color: "#f24405",
                    data: latestHistoricalData.map(({ date, score }: Score) => [date.getTime(), score * 100]),
                },
            ];

            const todayScore = this.currentValueFrom(latestHistoricalData);
            const formatString = todayScore === null ? "--" : "{y}";
            this.gaugeOptions.series = [
                {
                    type: "solidgauge",
                    radius: "62%",
                    innerRadius: "38%",
                    data: [Math.round(todayScore)],
                    dataLabels: {
                        format: `
                            <div style="text-align:center;">
                                <span style="font-size:40px;font-weight: 700; color: #304d86">${formatString}</span><br/>
                            </div>
                        `,
                        x: 0,
                        y: -30,
                    },
                },
            ];
        }
    }
}
