import { TestBed } from "@angular/core/testing";

import { OfflineUserInformationService } from "./offline-user-information.service";

describe("OfflineUserInformationService", () => {
    let service: OfflineUserInformationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OfflineUserInformationService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
