
export type GameData = {
    source_language: string;
    word: string;
    character_grid: string[][];
    word_locations: Record<string, string>;
    target_language: string;
};
export type ComparePathsResult = {
    win: boolean;
    winPaths: string[];
};

export type LetterValue = {
    letter: string;
    active: boolean;
    win: boolean;
};
export type Address = [number, number]; //[col, row]


export type LettersMap = Map<Address, LetterValue>;
