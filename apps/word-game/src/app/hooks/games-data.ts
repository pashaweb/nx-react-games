import { useCallback, useReducer } from 'react';
import { GameData } from '../../types';

type Staus = 'idle' | 'loading' | 'error';

type State = {
    currentGameID: string;
    totalGames: number;
    currentGame: GameData | null;
    gameState: string;
    allGamesData: GameData[];
    totalWins: number;
    status: Staus;

}

type Action = {
    type: 'SRET_CURRENT_GAME_ID'
    payload: string;
} | {
    type: 'INCREMENT_GAME_COUNT'
} | {
    type: 'SET_GAME_DATA'
    payload: GameData
} | {
    type: 'SET_WIN'
    payload: boolean
} | {
    type: 'SET_TOTAL_WINS'
    payload: number
} | {
    type: 'SET_STATUS'
    payload: Staus
}
    | {
        type: 'SET_ALL_GAMES_DATA'
        payload: GameData[]
    }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type UseGamesData = {
    state: State;
    init: () => void;

}


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SRET_CURRENT_GAME_ID':
            return { ...state, currentGameID: action.payload };

        case 'INCREMENT_GAME_COUNT':
            return { ...state, totalGames: state.totalGames + 1 };

        case 'SET_GAME_DATA':
            return { ...state, currentGame: action.payload };

        case 'SET_WIN':
            return { ...state, gameState: action.payload ? 'win' : 'active' };

        case 'SET_TOTAL_WINS':
            return { ...state, totalWins: action.payload };

        case 'SET_STATUS':
            return { ...state, status: action.payload };
        case 'SET_ALL_GAMES_DATA':
            return { ...state, allGamesData: action.payload };

        default:
            return state;
    }
}

export function useGamesData(): UseGamesData {
    const initialState: State = {
        currentGameID: '',
        totalGames: 0,
        currentGame: null,
        gameState: 'active',
        allGamesData: [],
        totalWins: 0,
        status: 'idle'
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const init = useCallback(async () => {
        dispatch({ type: 'SET_STATUS', payload: 'loading' });
        const data = await fetchGamesData();
        dispatch({ type: 'SET_GAME_DATA', payload: data[0] });
        dispatch({ type: 'SET_STATUS', payload: 'idle' });
        dispatch({ type: 'SET_ALL_GAMES_DATA', payload: data });

    }, []);

    return {
        state,
        init
    };



}

export default useGamesData

// Path: apps/word-game/src/app/hooks/game-hook.ts

const fetchGamesData = async () => {
    const response = await fetch('/games-data.json');
    const data = await response.json();
    return data;
}
