import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import { parseISO } from 'date-fns';
import { mean } from 'lodash';
import HighchartsBoost from 'highcharts/modules/boost';

more(Highcharts);
HighchartsBoost(Highcharts);

export interface Score {
  date: string;
  score: number;
}

@Component({
  selector: 'app-score-chart',
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.sass']
})
export class ScoreChartComponent implements OnChanges {

  @Input()
  public historicalData: Score[];

  @Input()
  public label: string;

  @Input()
  public currentValue?: number;

  public Highcharts: typeof Highcharts = Highcharts;

  get averageValue(): number {
    return this.historicalData ? mean(this.historicalData.map((score: Score) => score.score)) : null;
  }

  public chartOptions: Highcharts.Options =
    {
      title: {
        text: 'Track Your Progress'
      },

      yAxis: {
          title: {
              text: `Score`
          }
      },

      xAxis: {
        type: "datetime",
        labels: {
          formatter(): string {
            return Highcharts.dateFormat('%e/%d/%y', this.value);
          }
        }
      },
      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    },
      series: []
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.historicalData) {
      this.chartOptions.series = [{
        name: `${this.label} Scores`,
        type: "line",
        data: changes.historicalData.currentValue.map((score: Score) => [parseISO(score.date).getTime, score.score])}];
    }
  }
}
