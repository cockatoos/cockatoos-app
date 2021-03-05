import { storiesOf } from "@storybook/angular";
import { PhraseDiffComponent } from "@components/phrase-diff/phrase-diff.component";
import { of } from "rxjs";

const testCases = [
    {
        name: "Diff with Noop",
        recorded: "hello world",
        groundTruth: "hello world",
    },
    {
        name: "Diff with Inserts",
        recorded: "hello world",
        groundTruth: "hello small world",
    },
    {
        name: "Diff with Deletes",
        recorded: "hello big world",
        groundTruth: "hello world",
    },
    {
        name: "Diff with Replaces",
        recorded: "hello world",
        groundTruth: "hello worldwide",
    },
];

const storiesApi = storiesOf("Article Comparison/Phrase Diff", module);
testCases.forEach(({ name, recorded, groundTruth }) =>
    storiesApi.add(name, () => ({
        component: PhraseDiffComponent,
        props: {
            recordedPhrase: of(recorded),
            groundTruth: groundTruth,
        },
    }))
);
