import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
import { parseISO } from 'date-fns';
import { mean } from 'lodash';
import HighchartsBoost from 'highcharts/modules/boost';
import HCSoldGauge from 'highcharts/modules/solid-gauge';

more(Highcharts);
HighchartsBoost(Highcharts);
HCSoldGauge(Highcharts);

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

  public gaugeOptions: Highcharts.Options = {
    title: {
      text: undefined
    },
    yAxis: {
      stops: [
          [0.2, '#DF5353'], // red
          [0.5, '#DDDF0D'], // yellow
          [0.8, '#55BF3B'] // green
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      min: 0,
      max: 100,
      title: {
          text: undefined
      }
    },
    plotOptions: {
      solidgauge: {
          dataLabels: {
              borderWidth: 0,
              useHTML: true
          },
          rounded: true,
          linecap: 'round',
      }
    },
    pane: {
      center: ['50%', '50%'],
      size: '160%',
      startAngle: -90,
      endAngle: 270,
      background: [{ // Track for Exercise
          outerRadius: '62%',
          innerRadius: '38%',
          backgroundColor: '#fff6f6',
          borderWidth: 0,
      }],
    },
    series: [{
      type: 'solidgauge',
      radius: '62%',
      innerRadius: '38%',
      data: [20],
      dataLabels: {
        format:
            '<div style="text-align:center;">' +
              '<span style="font-size:40px;font-weight: 700; color: #304d86">{y}</span><br/>' +
            '</div>',
          x: 0,
          y: -30
      },
    }],
    tooltip: {
      enabled: false
    },
    chart: {
      reflow: true,
      height: 220,
      width: 220
    }

  };

  public chartOptions: Highcharts.Options =
    {
      title: {
        text: ''
      },

      yAxis: {
          title: {
              text: ``
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
    series: [],
    chart: {
      reflow: true,
      width: 320,
      height: 320
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true,
          symbol: 'circle',
          radius: 8
      }
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.historicalData) {
      this.chartOptions.series = [{
        name: `${this.label} Scores`,
        type: "line",
        color: "#f24405",
        data: changes.historicalData.currentValue.map((score: Score) => [parseISO(score.date).getTime, score.score])}];
    }
  }
}
