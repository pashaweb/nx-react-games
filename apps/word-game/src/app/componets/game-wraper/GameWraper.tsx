import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useGamesData from '../../hooks/games-data'
import Game from '../game/Game'
import styles from './GameWraper.module.scss'

export function GameWraper() {
    const { gameID } = useParams()
    const id = gameID ? parseInt(gameID) : 0

    const { state, init } = useGamesData()
    useEffect(() => {
        init()
    }, [init])

    return (
        <div className={styles['container']}>
            <h1>Welcome to GameWraper! {gameID} </h1>
            <nav>
                <ul>
                    {state.allGamesData.map((game, index) => {
                        return (
                            <li key={index}>
                                <Link to={`${index}`}>Game {index}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div>
                {state.allGamesData.length > 0 ? (
                    <div>
                        {state.allGamesData.map((game, index) => {
                            return index === id ? (
                                <Game key={index} gameData={game} />
                            ) : null
                        })}
                    </div>
                ) : (
                    <div>Game not found</div>
                )}
            </div>
        </div>
    )
}

export default GameWraper
