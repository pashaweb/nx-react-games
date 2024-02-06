import { useEffect } from 'react'
import { GameData } from '../../../types'
import { useGameHook } from '../../hooks/game-hook'
import GameGrid from '../GameGrid/GameGrid' // Fix the import path

/* eslint-disable-next-line */
export interface GameProps {
    /* eslint-disable-next-line */
    gameData: GameData
}

export function Game(props: GameProps) {
    console.log('Game render', props)
    const { state, onCellClick, onCellMouseOver, reset } = useGameHook(
        props.gameData
    )
    useEffect(() => {
        console.log('Game useEffect', props)
        reset(props.gameData)
    }, [props, reset])
    return (
        <>
            {state.gameState === 'win' ? <h1>Win</h1> : <h1>Game</h1>}
            <GameGrid
                grid={state.letters}
                cellClick={onCellClick}
                cellMouseOver={onCellMouseOver}
            />
        </>
    )
}

export default Game
