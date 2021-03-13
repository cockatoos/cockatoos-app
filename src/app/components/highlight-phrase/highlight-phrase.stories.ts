import { storiesOf } from "@storybook/angular";
import { TEST_ARTICLE } from "@testing/testing-article-data"
import { HighlightPhraseComponent } from "./highlight-phrase.component";

const { text, phrases } = TEST_ARTICLE;

const storiesApi = storiesOf("Article Comparison/Hihglight Phrase", module);
phrases.forEach(({ startIndex, endIndex }, index) =>
    storiesApi.add(`Phrase #${index + 1} of ${phrases.length}`, () => ({
        component: HighlightPhraseComponent,
        props: {
            text,
            startIndex,
            endIndex,
        },
    }))
);
