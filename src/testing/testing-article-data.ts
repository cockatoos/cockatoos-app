import { Article } from "@models/article.model";

export const TEST_ARTICLE: Article = {
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
