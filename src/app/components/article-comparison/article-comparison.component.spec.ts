import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ArticleComparisonComponent } from "@components/article-comparison/article-comparison.component";
import { TEST_ARTICLE } from "@testing/testing-article-data";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { ArticleComparisonService } from "@services/article-comparison.service";
import { UserInformationService } from "@services/user-information.service";
import { HttpClient } from "@angular/common/http";

describe("ArticleComparisonComponent", () => {
    let component: ArticleComparisonComponent;
    let fixture: ComponentFixture<ArticleComparisonComponent>;
    let store: MockStore;
    let mockArticleComparisonService: any;

    const initialState = {
        articleLevel: {
            status: "UNINITIALISED",
            clarityScores: [],
        },
        phraseLevel: {},
    };

    beforeEach(async () => {
        mockArticleComparisonService = {
            compare: jasmine.createSpy("compare").and.returnValue(true),
        };
        await TestBed.configureTestingModule({
            declarations: [ArticleComparisonComponent],
            providers: [
                ArticleComparisonComponent,
                {
                    provide: ArticleComparisonService,
                    useValue: mockArticleComparisonService,
                },
                {
                    provide: UserInformationService,
                    useValue: {},
                },
                {
                    provide: HttpClient,
                    useValue: {},
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
