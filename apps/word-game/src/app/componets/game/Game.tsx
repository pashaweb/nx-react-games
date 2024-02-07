import { GameData } from '../../../types'
import { useGameHook } from '../../hooks/game-hook'
import GameGrid from '../GameGrid/GameGrid' // Fix the import path

/* eslint-disable-next-line */
export interface GameProps {
    /* eslint-disable-next-line */
    gameData: GameData
}

export function Game(props: GameProps) {
    const { state, onCellClick, onCellMouseOver } = useGameHook(props.gameData)
    return (
        <>
            {state.gameState === 'win' ? <h1>Win</h1> : <h1>Game</h1>}
            <code>{JSON.stringify(props, null, 2)}</code>
            <GameGrid
                grid={state.letters}
                cellClick={onCellClick}
                cellMouseOver={onCellMouseOver}
            />
        </>
    )
}

export default Game
