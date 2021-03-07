import { storiesOf } from "@storybook/angular";

import { TEST_DOCUMENT } from "@testing/testing-article-data";

import { ArticleComparisonComponent } from "@components/article-comparison/article-comparison.component";
import { PhraseDiffComponent } from "@components/phrase-diff/phrase-diff.component";

import { TextToSpeechService } from "@services/text-to-speech.service";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { of } from "rxjs";

class MockTextToSpeechService {
    available = false;
}

const modules = {
    declarations: [
        PhraseDiffComponent,
    ],
    imports: [
        MatButtonModule,
        MatCardModule,
    ],
};

const disableTextToSpeechMixin = {
    providers: [
        PhraseDiffComponent,
        {
            provide: TextToSpeechService,
            useClass: MockTextToSpeechService,
        }
    ],
};

const storiesApi = storiesOf("Article Comparison/View", module);
storiesApi.add("Beginning", () => ({
    component: ArticleComparisonComponent,
    props: {
        document: TEST_DOCUMENT,
        recordedPhrase: of("the quick fox"),
    },
    moduleMetadata: modules,
}));

storiesApi.add("Web Speech unsupported", () => ({
    component: ArticleComparisonComponent,
    props: {
        document: TEST_DOCUMENT,
    },
    moduleMetadata: {
        ...modules,
        ...disableTextToSpeechMixin,
    },
}));
