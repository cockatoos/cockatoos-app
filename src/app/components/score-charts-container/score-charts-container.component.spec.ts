import { ComponentFixture, TestBed } from "@angular/core/testing";
import { OfflineUserInformationService } from "@services/offline-user-information.service";
import { UserInformationService } from "@services/user-information.service";

import { ScoreChartsContainerComponent } from "./score-charts-container.component";

describe("ScoreChartsContainerComponent", () => {
    let component: ScoreChartsContainerComponent;
    let fixture: ComponentFixture<ScoreChartsContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScoreChartsContainerComponent],
            providers: [
                {
                    provide: UserInformationService,
                    useClass: OfflineUserInformationService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScoreChartsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
