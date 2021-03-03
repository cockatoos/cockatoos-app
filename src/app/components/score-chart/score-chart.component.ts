import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import { parseISO } from 'date-fns';
import { mean } from 'lodash';

more(Highcharts);

@Component({
  selector: 'app-score-chart',
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.sass']
})
export class ScoreChartComponent implements OnChanges {

  @Input()
  public historicalData: string[];

  @Input()
  public label: string;

  @Input()
  public currentValue: string = '- -';

  public averageValue: string = '--';
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: Highcharts.Options = {
    title: {
      text: 'Track Your Progress'
    },

    yAxis: {
        title: {
            text: 'Score'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Date'
        }
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },
    series: [],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.historicalData) {
      this.averageValue = mean(changes.historicalData.currentValue.map(x => x[1]));
      this.chartOptions.series = [{
        name: 'Scores',
        type: "line",
        data: changes.historicalData.currentValue.map(x => [parseISO(x[0]), x[1]])
      }]
    }
  }
}
