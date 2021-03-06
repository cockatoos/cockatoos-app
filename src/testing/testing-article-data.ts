import { Document } from "@components/article-comparison/article-comparison.component";

export const TEST_DOCUMENT: Document = {
    text: "The quick brown fox jumps over the lazy dog.",
    phrases: [
        {
            startIndex: 0,
            endIndex: 19,
        },
        {
            startIndex: 20,
            endIndex: 30,
        },
        {
            startIndex: 31,
            endIndex: 44,
        },
    ],
};
