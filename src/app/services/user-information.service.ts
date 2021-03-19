import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ClarityScore } from "@models/clarity-score.model";
import { Observable, of } from "rxjs";
import * as firebase from "firebase";
import { map } from "rxjs/operators";
import { Timestamp } from "rxjs/internal/operators/timestamp";
import { Score } from "@components/score-chart/score-chart.component";
import { sum } from "lodash";

type AFSTimestamp = firebase.default.firestore.Timestamp;

interface AFSClarityScore {
    date: AFSTimestamp;
    numCorrect: number;
    numTotal: number;
    userId: string;
}

interface AFSAccentScore {
    date: AFSTimestamp;
    score: number;
    userId: string;
}

@Injectable({
    providedIn: "root",
})
export class UserInformationService {
    private userId = "testUser";

    constructor(private afs: AngularFirestore) {
        this.getClarityScores().subscribe((clarityScores) => {
            console.log("Clarity Scores");
            console.log(clarityScores);
        });

        this.getAccentScores().subscribe((accentScores) => {
            console.log("Accent Scores");
            console.log(accentScores);
        });
    }

    async saveClarityScore(clarityScore: ClarityScore): Promise<void> {
        const payload: AFSClarityScore = {
            date: firebase.default.firestore.FieldValue.serverTimestamp() as AFSTimestamp,
            numCorrect: clarityScore.numCorrectWords,
            numTotal: clarityScore.numTotalWords,
            userId: this.userId,
        };

        try {
            await this.afs.collection<AFSClarityScore>("clarity_scores").add(payload);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    private aggregateClarityScores(clarityScores: AFSClarityScore[]): Score[] {
        const aggregatedEntries = new Map<number, { correct: number; total: number }>();
        for (const clarityScore of clarityScores) {
            const dateWithoutTime = clarityScore.date.toDate();
            dateWithoutTime.setHours(0, 0, 0, 0);

            const dateWithoutTimeInMS = dateWithoutTime.getTime();
            const { numCorrect, numTotal } = clarityScore;
            if (!aggregatedEntries.has(dateWithoutTimeInMS)) {
                aggregatedEntries.set(dateWithoutTimeInMS, { correct: numCorrect, total: numTotal });
            } else {
                const { correct: existingCorrect, total: existingTotal } = aggregatedEntries.get(dateWithoutTimeInMS);
                aggregatedEntries.set(dateWithoutTimeInMS, {
                    correct: numCorrect + existingCorrect,
                    total: numTotal + existingTotal,
                });
            }
        }

        return Array.from(aggregatedEntries.entries())
            .sort(([date1, scores1], [date2, scores2]) => date1 - date2)
            .map(([date, { correct, total }]) => ({
                date: new Date(date).toDateString(),
                score: correct / total,
            }));
    }

    private aggregateAccentScores(accentScores: AFSAccentScore[]): Score[] {
        const aggregatedEntries = new Map<number, number[]>();
        for (const accentScore of accentScores) {
            const dateWithoutTime = accentScore.date.toDate();
            dateWithoutTime.setHours(0, 0, 0, 0);

            const dateWithoutTimeInMS = dateWithoutTime.getTime();
            if (!aggregatedEntries.has(dateWithoutTimeInMS)) {
                aggregatedEntries.set(dateWithoutTimeInMS, [accentScore.score]);
            } else {
                const existingScores = aggregatedEntries.get(dateWithoutTimeInMS);
                existingScores.push(accentScore.score);
            }
        }

        return Array.from(aggregatedEntries.entries())
            .sort(([date1, scores1], [date2, scores2]) => date1 - date2)
            .map(([date, scores]) => ({
                date: new Date(date).toDateString(),
                score: sum(scores) / scores.length,
            }));
    }

    getClarityScores(): Observable<Score[]> {
        return this.afs
            .collection<AFSClarityScore>("clarity_scores", (ref) => ref.where("userId", "==", this.userId))
            .valueChanges()
            .pipe(map(this.aggregateClarityScores));
    }

    getAccentScores(): Observable<Score[]> {
        return this.afs
            .collection<AFSAccentScore>("accent_scores", (ref) => ref.where("userId", "==", this.userId))
            .valueChanges()
            .pipe(map(this.aggregateAccentScores));
    }

    public getHistoricalData(): Observable<string> {
        return of();
    }
}
