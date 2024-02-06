import { render } from '@testing-library/react'

import { Address, LettersMap } from '@word-game/types'
import GameGrid from './GameGrid'
const map: LettersMap = new Map([
    [[0, 0], { letter: 'A', active: false, win: false }],
    [[0, 1], { letter: 'B', active: false, win: false }],
    [[1, 0], { letter: 'C', active: false, win: false }],
    [[1, 1], { letter: 'D', active: false, win: false }],
])

const cellClick = (address: Address) => {
    console.log(address)
}

const cellMouseOver = (address: Address) => {
    console.log(address)
}

describe('GameGrid', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <GameGrid
                grid={map}
                cellClick={cellClick}
                cellMouseOver={cellMouseOver}
            />
        )
        expect(baseElement).toBeTruthy()
        console.log(baseElement.innerHTML)
    })
})
