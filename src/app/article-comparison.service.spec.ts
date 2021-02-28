import { TestBed } from "@angular/core/testing";

import { ArticleComparisonService } from "./article-comparison.service";

describe("ArticleComparisonService", () => {
    let service: ArticleComparisonService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ArticleComparisonService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should work for identical phrases", () => {
        const edits = service.compare("hello world", "hello world");
        expect(edits.filter((edit) => edit.type === "noop").length).toEqual(2);
    });

    it("should be case-insensitve and robust to non-alphanumerics", () => {
        const edits = service.compare("hello world", "(Hello world!)");

        const noops = edits.filter((edit) => edit.type === "noop");
        expect(noops.length).toEqual(2);
    });

    it("should work for insertions", () => {
        const edits = service.compare("hello world", "hello small world)");

        const noops = edits.filter((edit) => edit.type === "noop");
        expect(noops.length).toEqual(2);

        const inserts = edits.filter((edit) => edit.type === "insert");
        expect(inserts.length).toEqual(4);
    });

    it("should work for deletions", () => {
        const edits = service.compare("hello again world", "hello world)");

        const noops = edits.filter((edit) => edit.type === "noop");
        expect(noops.length).toEqual(2);
        expect(noops[0]).toEqual({ type: "noop", word: "hello" });
        expect(noops[1]).toEqual({ type: "noop", word: "world" });

        const deletes = edits.filter((edit) => edit.type === "delete");
        expect(deletes.length).toEqual(1);
        expect(deletes[0]).toEqual({ type: "delete", word: "again" });
    });

    it("should work for replacements", () => {
        const edits = service.compare("hello worlds", "hello world)");

        const noops = edits.filter((edit) => edit.type === "noop");
        expect(noops.length).toEqual(1);
        expect(noops[0]).toEqual({ type: "noop", word: "hello"});

        const replaces = edits.filter((edit) => edit.type === "replace");
        expect(replaces.length).toEqual(1);
        expect(replaces[0]).toEqual({ type: "replace", from: "worlds", to: "world" });
    });
});
