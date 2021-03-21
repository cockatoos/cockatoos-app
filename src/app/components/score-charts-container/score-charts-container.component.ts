import { Component, OnInit } from '@angular/core';
import { TestAccentScoreData, TestClarityScoreData } from '@testing/testing-historical-score-data';

@Component({
  selector: 'app-score-charts-container',
  templateUrl: './score-charts-container.component.html',
  styleUrls: ['./score-charts-container.component.sass']
})
export class ScoreChartsContainerComponent implements OnInit {

  public testAccentData = TestAccentScoreData;
  public testClarityData = TestClarityScoreData;

  ngOnInit(): void {
  }

}
