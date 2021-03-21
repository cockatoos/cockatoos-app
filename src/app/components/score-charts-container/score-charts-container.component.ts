import { Component, OnInit } from '@angular/core';
import { TestAccentScoreData, TestClarityScoreData } from '@testing/testing-historical-score-data';
import { TourService } from 'ngx-tour-md-menu';

@Component({
  selector: 'app-score-charts-container',
  templateUrl: './score-charts-container.component.html',
  styleUrls: ['./score-charts-container.component.sass']
})
export class ScoreChartsContainerComponent implements OnInit {

  public testAccentData = TestAccentScoreData;
  public testClarityData = TestClarityScoreData;

  constructor(public tourService: TourService) {
    this.tourService.initialize([{
        anchorId: 'accent-chart',
        content: 'Accent chart shows you your accent over time!',
        // placement: 'below',
        enableBackdrop: true,
        route: '/home',
        title: 'Welcome to Cockatoos!',
    }]);
    this.tourService.start();
}

  ngOnInit(): void {
  }

}
