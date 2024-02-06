import { useReducer } from "react";
import { Address, ComparePathsResult, GameData, LettersMap } from "../../types";

export const handleCellClick = (address: Address, state: State): State => {
    const { startPoint } = state;
    if (startPoint === null) {
        return { ...state, startPoint: address };
    }

    return { ...state, endPoint: address };
}

export const setActiveLetters = (letters: LettersMap, active: Address[]): LettersMap => {
    const newLetters = new Map(letters);
    newLetters.forEach((l, a) => {
        newLetters.set(a, { ...l, active: active.some((act) => act[0] === a[0] && act[1] === a[1]) });
    });
    return newLetters;
}

export const setWinLetters = (letters: LettersMap, win: Address[]): LettersMap => {
    const newLetters = new Map(letters);
    newLetters.forEach((l, a) => {
        if (!newLetters.get(a)?.win) {
            newLetters.set(a, {
                ...l,
                win: win.some((act) => act[0] === a[0] && act[1] === a[1]),
                active: false
            });
        }

    });
    return newLetters;
}

export const getPath = (start: Address, end: Address): Address[] => {
    const path: Address[] = [];
    const [startCol, startRow] = start;
    const [endCol, endRow] = end;
    const rowDiff = endRow - startRow;
    if (rowDiff === 0) {
        const [start, end] = startCol < endCol ? [startCol, endCol] : [endCol, startCol];
        for (let i = start; i <= end; i++) {
            path.push([i, startRow]);
        }
        return path;
    }

    const colDiff = endCol - startCol;
    if (colDiff === 0) {
        const [start, end] = rowDiff < 0 ? [endRow, startRow] : [startRow, endRow];
        for (let i = start; i <= end; i++) {
            path.push([startCol, i]);
        }
        return path;
    }

    const minDiff = Math.min(Math.abs(rowDiff), Math.abs(colDiff));
    const colCoef = colDiff < 0 ? -1 : 1;
    const rowCoef = rowDiff < 0 ? -1 : 1;

    for (let i = 0; i <= minDiff; i++) {
        path.push([startCol + (i * colCoef), startRow + (i * rowCoef)]);
    }



    return path;
}


type State = {
    gameState: 'active' | 'win',
    startPoint: Address | null
    endPoint: Address | null
    letters: LettersMap,
    currentPath: Address[],
    winPath: string[]

}

type UseGameHook = {
    state: State
    onCellClick: (address: Address) => void
    onCellMouseOver: (address: Address) => void
    // setActive: () => void
    // setWin: () => void
    // reset: () => void
}



export const getGridData = (data: GameData): LettersMap => {
    const letters: LettersMap = new Map();
    data.character_grid.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const address: Address = [rowIndex, colIndex];
            letters.set(address, { letter, active: false, win: false });
        });
    });
    return letters;
}

type Action = {
    type: 'SET_START_POINT'
    payload: Address | null
} | {
    type: 'SET_ACTIVE_LETTERS'
    payload: LettersMap
} | {
    type: 'SET_WIN_LETTERS'
    payload: LettersMap
} | {
    type: 'SET_CURRENT_PATH'
    payload: Address[]
} | {
    type: 'SET_WIN_PATH_LIST'
    payload: string[];
} | {
    type: 'SET_WIN'
    payload: boolean
}


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_START_POINT':
            return { ...state, startPoint: action.payload };

        case 'SET_ACTIVE_LETTERS':
            return { ...state, letters: action.payload };

        case 'SET_WIN_LETTERS':
            return { ...state, letters: action.payload };

        case 'SET_CURRENT_PATH':
            return { ...state, currentPath: action.payload };

        case 'SET_WIN_PATH_LIST':
            return { ...state, winPath: action.payload };

        case 'SET_WIN':
            return { ...state, gameState: action.payload ? 'win' : 'active' };

        default:
            return state;
    }
};

const comparePaths = (pathsList: string[], currentPath: Address[]) => {


    const str = currentPath.join(',');
    const strRev = currentPath.reverse().join(',');
    const acc: ComparePathsResult = {
        win: false,
        winPaths: []
    }

    const t = pathsList.reduce((acc, path) => {
        if (path === str || path === strRev) {
            acc.win = true;
        } else {
            acc.winPaths.push(path);
        }
        return acc;
    }, acc);

    return t;


}


export function useGameHook(iniData: GameData): UseGameHook {

    const letters: LettersMap = new Map();

    iniData.character_grid.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const address: Address = [colIndex, rowIndex];
            letters.set(address, { letter, active: false, win: false });
        });
    });
    const winPath = Object.keys(iniData.word_locations);

    const initialState: State = {
        letters: letters,
        startPoint: null,
        endPoint: null,
        currentPath: [],
        winPath,
        gameState: 'active',
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const onCellClick = (address: Address) => {
        let adr: Address[] = [];
        if (state.startPoint === null) {
            dispatch({ type: 'SET_START_POINT', payload: address });
            adr = [address];
            const newLetterrs = setActiveLetters(state.letters, adr);
            dispatch({ type: 'SET_ACTIVE_LETTERS', payload: newLetterrs });
            return;
        }

        const result = comparePaths(state.winPath, state.currentPath);
        if (!result.win) {
            const newLetterrs = setActiveLetters(state.letters, []);
            dispatch({ type: 'SET_ACTIVE_LETTERS', payload: newLetterrs });
            dispatch({ type: 'SET_START_POINT', payload: null });


        }

        if (result.win) {
            const newLetterrs = setWinLetters(state.letters, state.currentPath);
            dispatch({ type: 'SET_WIN_LETTERS', payload: newLetterrs });
            dispatch({ type: 'SET_WIN_PATH_LIST', payload: result.winPaths });
        }
        if (result.winPaths.length === 0) {
            dispatch({ type: 'SET_WIN', payload: true });
        }

        dispatch({ type: 'SET_START_POINT', payload: null });
        dispatch({ type: 'SET_CURRENT_PATH', payload: [] });


    }

    const onCellMouseOver = (address: Address) => {
        if (state.startPoint === null) return;
        const adr = getPath(state.startPoint, address);
        const newLetterrs = setActiveLetters(state.letters, adr);

        dispatch({ type: 'SET_CURRENT_PATH', payload: adr });
        dispatch({ type: 'SET_ACTIVE_LETTERS', payload: newLetterrs });
    }

    return {
        state,
        onCellClick,
        onCellMouseOver
    }
}

export default useGameHook
