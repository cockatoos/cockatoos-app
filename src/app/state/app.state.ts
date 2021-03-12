import { State as ArticleLevelState } from "@state/reducers/article-level.reducer";
import { State as PhraseLevelState } from "@state/reducers/phrase-level.reducer";

export interface AppState {
    articleLevel: Readonly<ArticleLevelState>;
    phraseLevel: Readonly<PhraseLevelState>;
}
