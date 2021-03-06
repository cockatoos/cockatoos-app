import { storiesOf } from "@storybook/angular";
import { ArticleComparisonComponent } from "@components/article-comparison/article-comparison.component";
import { TEST_DOCUMENT } from "@testing/testing-article-data";

const storiesApi = storiesOf("Article Comparison/View", module);
storiesApi.add("Beginning", () => ({
    component: ArticleComparisonComponent,
    props: {
        document: TEST_DOCUMENT,
    }
}));
