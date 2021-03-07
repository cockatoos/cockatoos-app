import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DataConnectorComponent } from "./data-connector.component";

describe("DataConnectorComponent", () => {
    let component: DataConnectorComponent;
    let fixture: ComponentFixture<DataConnectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DataConnectorComponent],
        }).compileComponents();
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
