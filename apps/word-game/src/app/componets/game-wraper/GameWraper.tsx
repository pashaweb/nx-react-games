import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useGamesData from '../../hooks/games-data'
import Game from '../game/Game'
import styles from './GameWraper.module.scss'

/* eslint-disable-next-line */
export interface GameWraperProps {}

// const gameData: GameData = {
//     source_language: 'en',
//     target_language: 'es',
//     word: 'hello',
//     character_grid: [
//         ['h', 'e', 'l', 'l', 'o'],
//         ['a', 'b', 'c', 'd', 'e'],
//         ['f', 'g', 'h', 'i', 'j'],
//         ['k', 'l', 'm', 'n', 'o'],
//         ['p', 'q', 'r', 's', 't'],
//     ],
//     word_locations: { '0,0,1,0,2,0,3,0,4,0': 'hello' },
// }

export function GameWraper(props: GameWraperProps) {
    console.log('GameWraper', props)
    const { gameID } = useParams()

    const { state, init, setCurrentGame } = useGamesData()
    useEffect(() => {
        init()
    }, [init])

    useEffect(() => {
        console.log('gameID', gameID)
        if (gameID && state.allGamesData) {
            const id = gameID ? parseInt(gameID) : 0
            const game = state.allGamesData[id]

            if (game) {
                setCurrentGame(game)

                // setTimeout(() => {
                // }, 0)
            }
        }
    }, [gameID, state.allGamesData, setCurrentGame])

    return (
        <>
            <div className={styles['container']}>
                <h1>Welcome to GameWraper! {gameID} </h1>
                <nav>
                    <ul>
                        {state.allGamesData.map((game, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/${index}`}>Game {index}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <div>
                    {state.currentGame ? (
                        <Game gameData={state.currentGame} />
                    ) : (
                        <div>Game not found</div>
                    )}
                </div>
            </div>
            {/* <div>
                <Game gameData={gameData} />
            </div> */}
        </>
    )
}

export default GameWraper
