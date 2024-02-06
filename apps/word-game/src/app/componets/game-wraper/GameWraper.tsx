import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
    const { gameID } = useParams()
    const { state, init } = useGamesData()
    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <div className={styles['container']}>
                <h1>Welcome to GameWraper! {gameID} </h1>
                <div>
                    {state.allGamesData.map((game, index) => {
                        return (
                            <div key={index}>
                                <h2>{game.word}</h2>
                                <Game gameData={game} />
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* <div>
                <Game gameData={gameData} />
            </div> */}
        </>
    )
}

export default GameWraper
