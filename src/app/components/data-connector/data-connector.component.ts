import { Component } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export interface Item {
    price: number;
    name: string;
}

@Component({
    selector: "app-data-connector",
    templateUrl: "./data-connector.component.html",
    styleUrls: ["./data-connector.component.sass"],
})
export class DataConnectorComponent {
    private itemsCollection: AngularFirestoreCollection<Item>;
    items: Observable<Item[]>;
    constructor(private afs: AngularFirestore) {
        // Reads from the collection called "items
        this.itemsCollection = afs.collection<Item>("items");

        // Adds a new item to the "items" collection
        // this.itemsCollection.add({name: 'fish', price: 20})
        this.items = this.itemsCollection.valueChanges();
    }
    addItem(item: Item): void {
        this.itemsCollection.add(item);
    }
}
