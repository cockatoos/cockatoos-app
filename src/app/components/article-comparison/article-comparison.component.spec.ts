import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TextToSpeechService } from "app/services/text-to-speech.service";

import { ArticleComparisonComponent } from "./article-comparison.component";

const TEST_DOCUMENT = {
    text: "",
    phrases: [
        {
            startIndex: 0,
            endIndex: 0,
        },
    ],
};

describe("ArticleComparisonComponent", () => {
    let component: ArticleComparisonComponent;
    let fixture: ComponentFixture<ArticleComparisonComponent>;
    let mockTextToSpeechService: any;

    beforeEach(async () => {
        mockTextToSpeechService = jasmine.createSpyObj("TextToSpeechService", ["speak"], {
            available: true,
        });
        await TestBed.configureTestingModule({
            declarations: [ArticleComparisonComponent],
            providers: [
                ArticleComparisonComponent,
                {
                    provide: TextToSpeechService,
                    useValue: mockTextToSpeechService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleComparisonComponent);
        component = fixture.componentInstance;
        component.document = TEST_DOCUMENT;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should run text-to-speech on target phrase", () => {
        // GIVEN
        const targetPhrase = "hello world";
        spyOnProperty(component, "targetPhrase", "get").and.returnValue(targetPhrase);

        const element: HTMLElement = fixture.nativeElement;
        const speakButton = element.querySelector("#btnSpeak") as HTMLButtonElement;

        // WHEN
        speakButton.click();

        // THEN
        expect(mockTextToSpeechService.speak.calls.count()).toBe(1);
        expect(mockTextToSpeechService.speak).toHaveBeenCalledWith(targetPhrase);
    });
});