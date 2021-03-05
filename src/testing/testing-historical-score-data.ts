import { Score } from "@components/score-chart/score-chart.component";

/*
* dummy data to test the scoer chart component
* the data is an array of {date, accent score, clarity score}
*/ 
export const TestAccentScoreData: Score[] = [
    { date: '2020-01-01', score: 50 },
    { date: '2020-01-02', score: 60},
    { date: '2020-01-03', score: 55},
    { date: '2020-01-05', score: 70},
    { date: '2020-01-07', score: 80}
];

export const TestClarityScoreData: any = [
    { date: '2020-01-01', score: 20 },
    { date: '2020-01-02', score: 30},
    { date: '2020-01-03', score: 45},
    { date: '2020-01-05', score: 40},
    { date: '2020-01-07', score: 60}
];