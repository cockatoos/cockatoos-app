import { storiesOf } from "@storybook/angular";

import { TEST_ARTICLE } from "@testing/testing-article-data";

import { ArticleComparisonComponent } from "@components/article-comparison/article-comparison.component";
import { PhraseDiffComponent } from "@components/phrase-diff/phrase-diff.component";

import { TextToSpeechService } from "@services/text-to-speech.service";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StoreModule } from "@ngrx/store";
import { articleLevelReducer } from "@state/reducers/article-level.reducer";
import { phraseLevelReducer } from "@state/reducers/phrase-level.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ArticleLevelEffects } from "@state/effects/article-level.effects";
import { PhraseLevelEffects } from "@state/effects/phrase-level.effects";

class MockTextToSpeechService {
    available = false;
}

const declarations = [PhraseDiffComponent];

const materialImportsMixin = [MatButtonModule, MatCardModule, MatProgressSpinnerModule];

const enableStoreImportsMixin = [
    StoreModule.forRoot({
        articleLevel: articleLevelReducer,
        phraseLevel: phraseLevelReducer,
    }),
];

const enableEffectsImportsMixin = [EffectsModule.forRoot([ArticleLevelEffects, PhraseLevelEffects])];

const disableTextToSpeechMixin = {
    providers: [
        PhraseDiffComponent,
        {
            provide: TextToSpeechService,
            useClass: MockTextToSpeechService,
        },
    ],
};

const storiesApi = storiesOf("Article Comparison/View", module);
storiesApi.add("Beginning", () => ({
    component: ArticleComparisonComponent,
    props: {
        article: TEST_ARTICLE,
    },
    moduleMetadata: {
        declarations,
        imports: [...materialImportsMixin, ...enableStoreImportsMixin, ...enableEffectsImportsMixin],
    },
}));

storiesApi.add("Web Speech unsupported", () => ({
    component: ArticleComparisonComponent,
    props: {
        article: TEST_ARTICLE,
    },
    moduleMetadata: {
        declarations,
        imports: [...materialImportsMixin, ...enableStoreImportsMixin, ...enableEffectsImportsMixin],
        ...disableTextToSpeechMixin,
    },
}));
