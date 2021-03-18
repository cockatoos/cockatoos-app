import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ClarityScore } from "@models/clarity-score.model";
import { Observable, of } from "rxjs";
import * as firebase from 'firebase';

//
interface AFSClarityScore {
    date: firebase.default.firestore.FieldValue;
    numCorrect: number;
    numTotal: number;
    userId: string;
}

@Injectable({
    providedIn: "root",
})
export class UserInformationService {
    private userId = "testUser";

    constructor(private afs: AngularFirestore) {}

    async saveClarityScore(clarityScore: ClarityScore): Promise<void> {
        const payload: AFSClarityScore = {
            date: firebase.default.firestore.FieldValue.serverTimestamp(),
            numCorrect: clarityScore.numCorrectWords,
            numTotal: clarityScore.numTotalWords,
            userId: this.userId,
        };

        await this.afs.collection("clarity_scores").add(payload);
    }

    public getHistoricalData(): Observable<string> {
        return of();
    }
}
