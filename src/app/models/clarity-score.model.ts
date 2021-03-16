import { Edit } from "@services/article-comparison.service";
import { sum } from "lodash";

export interface ClarityScore {
    numCorrectWords: number;
    numTotalWords: number;
}

export const clarityScoreFromEdits = (edits: Edit[]): ClarityScore => ({
    numCorrectWords: edits.filter(edit => edit.type === "noop").length,
    numTotalWords: edits.length,
}); 

export const computeClarityScore = (...clarityScores: ClarityScore[]): number => {
    const totalCorrectWords = sum(clarityScores.map(({ numCorrectWords }) => numCorrectWords));
    const totalWords = sum(clarityScores.map(({ numTotalWords }) => numTotalWords));
    return totalCorrectWords / totalWords;
};
