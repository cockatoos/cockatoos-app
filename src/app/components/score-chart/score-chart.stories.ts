import { ScoreChartComponent } from '@components/score-chart/score-chart.component';
import { moduleMetadata, Story } from '@storybook/angular';
import { TestAccentScoreData } from '@testing/testing-historical-score-data';
import { HighchartsChartComponent } from 'highcharts-angular';
import { parseISO } from 'date-fns';
import { mean }from 'lodash';

export default {
    title: 'Score/Score Chart',
    component: ScoreChartComponent,
    decorators: [
        moduleMetadata({
            declarations: [ ScoreChartComponent, HighchartsChartComponent ],
            imports: []
        })
    ]
}

const Template: Story<ScoreChartComponent> = (args: ScoreChartComponent) => ({
    component: ScoreChartComponent,
    props: args,
    template:`
        <app-score-chart></app-score-chart>
    `
});

export const WithoutCurrentValue = () => ({
    component: ScoreChartComponent,
    props: {
        currentValue: null,
        label: 'Accent',
        historicalData: TestAccentScoreData
    },
});


export const WithCurrentValue = () => ({
    component: ScoreChartComponent,
    props: {
        currentValue: 77,
        label: 'Accent',
        averageValue: mean(TestAccentScoreData.map(x => x[1])),
        chartOptions: {
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
            series: [{
                name: "Scores",
                type: "line",
                data: TestAccentScoreData.map(x => [parseISO(x[0]), x[1]]),
            }]
          }
    },
});
