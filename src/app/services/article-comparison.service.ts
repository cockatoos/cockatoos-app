import { Injectable } from "@angular/core";

export type Edit = Insert | Delete | Replace | Noop;

//
// An "edit" is either a word insertion, deletion, or replacement.
// "Noop" (or no-operation) means that the word was correct.
//

interface Insert {
    type: "insert";
    word: string;
}

interface Delete {
    type: "delete";
    word: string;
}

interface Replace {
    type: "replace";
    from: string;
    to: string;
}

interface Noop {
    type: "noop";
    word: string;
}

@Injectable({
    providedIn: "root",
})
export class ArticleComparisonService {
    constructor() {}

    /**
     * Return the list of edits (including no-ops) required to transform
     * the @param recorded phrase into the @param groundTruth phrase.
     *
     * This uses the Levenshtein distance but on a word-level.
     */
    compare(recorded: string, groundTruth: string): Edit[] {
        const recordedWords = this.toWords(recorded);
        const groundTruthWords = this.toWords(groundTruth);

        const table: number[][] = [];
        for (let i = 0; i <= recordedWords.length; ++i) {
            table.push([]);
            for (let j = 0; j <= groundTruthWords.length; ++j) {
                table[i][j] = j === 0 ? i : i === 0 ? j : 0;
            }
        }

        for (let i = 0; i < recordedWords.length; ++i) {
            const recordedWord = recordedWords[i];
            for (let j = 0; j < groundTruthWords.length; ++j) {
                const groundTruthWord = groundTruthWords[j];

                const substitutionCost =
                    recordedWord === groundTruthWord
                        ? 0 // no replacement cost if words are same
                        : 1; // replacement cost of 1 if words are different

                table[i + 1][j + 1] = Math.min(
                    table[i][j + 1] + 1, // deleting `recordedWord`
                    table[i + 1][j] + 1, // inserting `recordedWord`
                    table[i][j] + substitutionCost // (possible) replacement
                );
            }
        }

        return this.traceLevenshteinDistanceEdits(recordedWords, groundTruthWords, table);
    }

    /**
     * Backtracks the @param distance dynamic programming table and returns the list of
     * Edits to transform the @param input list of words into the @param target list of words.
     */
    private traceLevenshteinDistanceEdits(input: string[], target: string[], distance: number[][]): Edit[] {
        const edits: Edit[] = [];
        let i = input.length;
        let j = target.length;
        while (i > 0 && j > 0) {
            const possibleEdits: [Edit, number][] = [];
            if (j > 0) {
                possibleEdits.push([
                    {
                        type: "insert",
                        word: target[j - 1],
                    },
                    distance[i][j - 1],
                ]);
            }
            if (i > 0) {
                possibleEdits.push([
                    {
                        type: "delete",
                        word: input[i - 1],
                    },
                    distance[i - 1][j],
                ]);
            }
            if (i > 0 && j > 0) {
                if (input[i - 1] === target[j - 1]) {
                    possibleEdits.push([
                        {
                            type: "noop",
                            word: input[i - 1],
                        },
                        distance[i - 1][j - 1],
                    ]);
                } else {
                    possibleEdits.push([
                        {
                            type: "replace",
                            from: input[i - 1],
                            to: target[j - 1],
                        },
                        distance[i - 1][j - 1],
                    ]);
                }
            }

            const optimalDistance = Math.min(...possibleEdits.map(([_, distance]) => distance));
            const optimalEdits = possibleEdits
                .filter(([_, distance]) => distance === optimalDistance)
                .map(([edit, _]) => edit)
                .sort((firstEdit, secondEdit) => {
                    // Sort edits to favour noop or replacements over insert or delete.
                    if (firstEdit.type === "noop" || firstEdit.type === "replace") {
                        return -1;
                    }

                    if (secondEdit.type === "noop" || secondEdit.type === "replace") {
                        return 1;
                    }

                    return 0;
                });

            const optimalEdit = optimalEdits[0];
            edits.push(optimalEdits[0]);

            switch (optimalEdit.type) {
                case "insert":
                    j--;
                    break;
                case "delete":
                    i--;
                    break;
                default:
                    i--;
                    j--;
                    break;
            }
        }

        // We accumulate the edits from right to left, and will have to reverse
        // the list before returning.
        return edits.reverse();
    }

    /**
     * Generate the list of words from the @param phrase.
     */
    private toWords(phrase: string): string[] {
        return phrase
            .split(" ")
            .map((word) => word.trim()) // remove whitespace
            .map((word) => this.processChars(word)) // filter characters
            .map((word) => word.toLocaleLowerCase()); // case-insensitive
    }

    /**
     * Process and remove any characters from the @param word that
     * should not be considered in the word comparison process.
     */
    private processChars(word: string): string {
        return word
            .split("")
            .filter((char) => char.match(/[a-zA-Z0-9]/))
            .join("");
    }

    //
    // Explicit type narrowing because Angular directives _still_ do not
    // support discriminated unions...
    //
    asInsert(edit: Edit): Insert {
        return edit as Insert;
    }

    asDelete(edit: Edit): Delete {
        return edit as Delete;
    }

    asReplace(edit: Edit): Replace {
        return edit as Replace;
    }

    asNoop(edit: Edit): Noop {
        return edit as Noop;
    }
}
