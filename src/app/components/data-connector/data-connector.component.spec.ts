import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AngularFirestore, AngularFirestoreModule } from "@angular/fire/firestore";
import { of } from "rxjs";

import { DataConnectorComponent } from "./data-connector.component";

describe("DataConnectorComponent", () => {
    let component: DataConnectorComponent;
    let fixture: ComponentFixture<DataConnectorComponent>;
    const data = [];

    let angularFireStoreSpy: jasmine.SpyObj<AngularFirestore>;

    beforeEach(async () => {
        const mockCollection = {
            valueChanges: jasmine.createSpy("valueChanges").and.returnValue(of(data)),
        };
        const mockFirestore = {
            collection: jasmine.createSpy("collection").and.returnValue(mockCollection),
        };

        await TestBed.configureTestingModule({
            declarations: [DataConnectorComponent],
            providers: [
                DataConnectorComponent,
                {
                    provide: AngularFirestore,
                    useValue: mockFirestore,
                },
            ],
        }).compileComponents();

        angularFireStoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DataConnectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
