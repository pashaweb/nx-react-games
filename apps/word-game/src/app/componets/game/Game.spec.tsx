import { render } from '@testing-library/react'

import { GameData } from '@word-game/types'
import Game from './Game'
const gameData: GameData = {
    source_language: 'en',
    target_language: 'es',
    word: 'hello',
    character_grid: [
        ['h', 'e', 'l', 'l', 'o'],
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'j'],
        ['k', 'l', 'm', 'n', 'o'],
        ['p', 'q', 'r', 's', 't'],
    ],
    word_locations: { '0,0,1,0,2,0,3,0,4,0': 'hello' },
}

describe('Game', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Game gameData={gameData} />)
        expect(baseElement).toBeTruthy()
    })
})
