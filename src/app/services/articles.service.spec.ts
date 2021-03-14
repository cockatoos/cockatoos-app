import { TestBed } from "@angular/core/testing";
import { AngularFirestore } from "@angular/fire/firestore";
import { of } from "rxjs";

import { ArticlesService } from "./articles.service";

describe("ArticlesService", () => {
    let service: ArticlesService;
    let angularFireStoreSpy: jasmine.SpyObj<AngularFirestore>;

    const data = [];

    beforeEach(() => {
        const mockCollection = {
            valueChanges: jasmine.createSpy("valueChanges").and.returnValue(of(data)),
        };
        const mockFirestore = {
            collection: jasmine.createSpy("collection").and.returnValue(mockCollection),
        };

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AngularFirestore,
                    useValue: mockFirestore,
                },
            ],
        });

        service = TestBed.inject(ArticlesService);
        angularFireStoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
