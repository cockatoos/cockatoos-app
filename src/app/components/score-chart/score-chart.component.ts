import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import { parseISO } from 'date-fns';
import { mean } from 'lodash';
import HighchartsBoost  from 'highcharts/modules/boost';

more(Highcharts);
HighchartsBoost(Highcharts);

export interface Score {
  date: string,
  score: number
}

@Component({
  selector: 'app-score-chart',
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.sass']
})
export class ScoreChartComponent {

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

  get chartOptions(): Highcharts.Options {
    return {
      title: {
        text: 'Track Your Progress'
      },
  
      yAxis: {
          title: {
              text: `${this.label} Score`
          }
      },
  
      xAxis: {
        type: "datetime",
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%e/%d/%y', this.value);
          }
        }
      },
      series: [{
        name: `${this.label} Score`,
        type: "line",
        data: this.historicalData ? this.historicalData.map((score: Score) => [parseISO(score.date).getTime(), score.score]) : [],
      }]
    };
  }
}
