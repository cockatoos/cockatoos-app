import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TEST_ARTICLE } from "@testing/testing-article-data";

import { HighlightPhraseComponent } from "./highlight-phrase.component";

const { startIndex, endIndex } = TEST_ARTICLE.phrases[1];

describe("HighlightPhraseComponent", () => {
    let component: HighlightPhraseComponent;
    let fixture: ComponentFixture<HighlightPhraseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HighlightPhraseComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HighlightPhraseComponent);
        component = fixture.componentInstance;

        component.text = TEST_ARTICLE.text;
        component.startIndex = startIndex;
        component.endIndex = endIndex;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
