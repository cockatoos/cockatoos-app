import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Article } from "app/models/article.model";
import { zipWith } from "lodash";
import { identity, Observable } from "rxjs";
import { first, map, mergeMap } from "rxjs/operators";

interface FirestoreArticle {
    name: string;
    text: string;
    phrases: number[];
}

@Injectable({
    providedIn: "root",
})
export class ArticlesService {
    private articlesCollection: AngularFirestoreCollection<FirestoreArticle>;
    articles$: Observable<Article[]>;

    constructor(private afs: AngularFirestore) {
        this.articlesCollection = afs.collection<FirestoreArticle>("articles");
        this.articles$ = this.articlesCollection
            .valueChanges({ idField: "name" })
            .pipe(map((firestoreArticles) => firestoreArticles.map(this.parseFirestoreArticle)));
    }

    /**
     * Gets the first document in the store.
     */
    getDocument(): Observable<Article> {
        return this.articles$.pipe(map((articles) => articles[0]));
    }

    /**
     * Converts the Firestore-formatted @param firestoreArticle to the Article format
     * used in the app. The article stored in Firestore lists the start indexes of the phrases,
     * and this needs to be converted into a list of start/end indexes for each phrase.
     */
    private parseFirestoreArticle(firestoreArticle: FirestoreArticle): Article {
        const { name, text, phrases: startIndexes } = firestoreArticle;
        const endIndexes = startIndexes.slice(1).concat(text.length);
        const phrases = zipWith(startIndexes, endIndexes, (startIndex, endIndex) => ({ startIndex, endIndex }));
        return { name, text, phrases };
    }
}
