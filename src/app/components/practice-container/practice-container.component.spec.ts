import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { AnalyseDialogComponent } from "@components/analyse-dialog/analyse-dialog.component";
import { ArticlesService } from "@services/articles.service";
import { of } from "rxjs";

import { PracticeContainerComponent } from "./practice-container.component";

describe("PracticeContainerComponent", () => {
    let component: PracticeContainerComponent;
    let fixture: ComponentFixture<PracticeContainerComponent>;
    let articlesServiceSpy: jasmine.SpyObj<ArticlesService>;
    const data = [];

    beforeEach(async () => {
        const mockArticlesService = {
            getDocument: jasmine.createSpy("getDocument").and.returnValue(of(data)),
        };
        await TestBed.configureTestingModule({
            declarations: [PracticeContainerComponent, AnalyseDialogComponent],
            imports: [MatDialogModule],
            providers: [
                PracticeContainerComponent,
                {
                    provide: ArticlesService,
                    useValue: mockArticlesService,
                },
            ]
        }).compileComponents();

        articlesServiceSpy = TestBed.inject(ArticlesService) as jasmine.SpyObj<ArticlesService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PracticeContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
