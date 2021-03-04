import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PhraseDiffComponent } from "./phrase-diff.component";

describe("PhraseDiffComponent", () => {
    let component: PhraseDiffComponent;
    let fixture: ComponentFixture<PhraseDiffComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PhraseDiffComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PhraseDiffComponent);
        component = fixture.componentInstance;
        component.recordedPhrase = "hello world";
        component.groundTruth = "hello world";
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
