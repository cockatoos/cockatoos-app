import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-score-chart',
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.sass']
})
export class ScoreChartComponent implements OnInit {

  private options: any = {};

  constructor() { }

  ngOnInit(): void {
    Highcharts.chart('container', this.options);
  }

}
