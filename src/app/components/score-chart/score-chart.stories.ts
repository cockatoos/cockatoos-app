import { ScoreChartComponent } from '@components/score-chart/score-chart.component';
import { moduleMetadata, Story } from '@storybook/angular';

export default {
    title: 'Score/Score Chart',
    component: ScoreChartComponent,
    decorators: [
        moduleMetadata({
            declarations: [ScoreChartComponent],
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

export const DefaultScoreChart = Template.bind([]);
