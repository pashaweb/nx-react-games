import { Address, LettersMap } from '../../../types'
import Letter from '../letter/Letter'
import styles from './GameGrid.module.scss'

/* eslint-disable-next-line */
export interface GameGridProps {
    grid: LettersMap
    cellClick: (address: Address) => void
    cellMouseOver: (address: Address) => void
}

const getColomsStyle = (grid: LettersMap): number => {
    const keys = Array.from(grid.keys())
    const maxRow = keys.reduce((max, [row, _]) => (row > max ? row : max), 0)
    return maxRow + 1
}
export function GameGrid(props: GameGridProps) {
    const grid = props.grid
    const style = {
        gridTemplateColumns: `repeat(${getColomsStyle(grid)}, 1fr) `,
    }

    const handeleClick = (address: Address) => {
        props.cellClick(address)
    }

    const handeleBtnMouseEnter = (address: Address) => {
        props.cellMouseOver(address)
    }

    return (
        <div className={styles['container']}>
            {grid.size > 0 ? (
                <div className={styles.greed} style={style}>
                    {Array.from(grid).map((cell, index) => {
                        const [address, letter] = cell
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    handeleClick(address)
                                }}
                                onMouseEnter={() => {
                                    handeleBtnMouseEnter(address)
                                }}
                            >
                                <Letter
                                    letter={letter.letter}
                                    active={letter.active}
                                    win={letter.win}
                                />
                            </button>
                        )
                    })}
                </div>
            ) : (
                <div>Empty Grid</div>
            )}
        </div>
    )
}

export default GameGrid
