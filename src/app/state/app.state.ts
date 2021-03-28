import { State as ArticleLevelState } from "@state/reducers/article-level.reducer";
import { State as PhraseLevelState } from "@state/reducers/phrase-level.reducer";
import { State as PracticeContainerLevelState } from "@state/reducers/practice-container-level.reducer";

export interface AppState {
    articleLevel: Readonly<ArticleLevelState>;
    phraseLevel: Readonly<PhraseLevelState>;
    practiceContainerLevel: Readonly<PracticeContainerLevelState>;
}
