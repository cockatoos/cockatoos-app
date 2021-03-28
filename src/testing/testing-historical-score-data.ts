import { Score } from "@components/score-chart/score-chart.component";

/*
 * dummy data to test the scoer chart component
 * the data is an array of {date, accent score, clarity score}
 */
export const TestAccentScoreData: Score[] = [
    { date: new Date(2020, 1, 1), score: 0.5 },
    { date: new Date(2020, 1, 2), score: 0.6 },
    { date: new Date(2020, 1, 3), score: 0.55 },
    { date: new Date(2020, 1, 5), score: 0.7 },
    { date: new Date(2020, 1, 7), score: 0.8 },
];

export const TestClarityScoreData: Score[] = [
    { date: new Date(2020, 1, 1), score: 0.2 },
    { date: new Date(2020, 1, 2), score: 0.3 },
    { date: new Date(2020, 1, 3), score: 0.45 },
    { date: new Date(2020, 1, 5), score: 0.4 },
    { date: new Date(2020, 1, 7), score: 0.6 },
];
