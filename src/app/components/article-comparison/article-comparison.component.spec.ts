import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TextToSpeechService } from "@services/text-to-speech.service";
import { ArticleComparisonComponent } from "@components/article-comparison/article-comparison.component";
import { TEST_ARTICLE } from "@testing/testing-article-data";
import { provideMockStore, MockStore } from "@ngrx/store/testing";

describe("ArticleComparisonComponent", () => {
    let component: ArticleComparisonComponent;
    let fixture: ComponentFixture<ArticleComparisonComponent>;
    let store: MockStore;
    let mockTextToSpeechService: any;

    const initialState = {
        articleLevel: {
            status: "UNINITIALISED",
        },
        phraseLevel: {
        },
    };

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
                provideMockStore({ initialState }),
            ],
        }).compileComponents();

        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleComparisonComponent);
        component = fixture.componentInstance;
        component.article = TEST_ARTICLE;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
