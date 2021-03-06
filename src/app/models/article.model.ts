//
// An article is represented by the full article text, along with
// the list of phrase indexes. Each phrase is represented by a start- and
// end-index. The index refers to the _character_ index, __not the word__.
//
export interface Phrase {
    startIndex: number;
    endIndex: number;
}

export interface Article {
    name: string;
    text: string;
    phrases: Phrase[];
}
