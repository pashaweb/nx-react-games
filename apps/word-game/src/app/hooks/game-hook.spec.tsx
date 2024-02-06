// FILEPATH: /home/pavel/DEV/react-games/apps/word-game/src/app/hooks/game-hook.test.ts
import {
    GameData,
    LettersMap,
    getGridData,
    setActiveLetters,
    type Address,
} from './game-hook'

describe('game hook', () => {
    describe('set leters data', () => {
        it('should return a new LettersMap with the specified addresses set to active', () => {
            const map: LettersMap = new Map([
                [[0, 0], { letter: 'A', active: false, win: false }],
                [[0, 1], { letter: 'B', active: false, win: false }],
                [[1, 0], { letter: 'C', active: false, win: false }],
                [[1, 1], { letter: 'D', active: false, win: false }],
            ])
            const add: Address[] = [
                [0, 0],
                [1, 1],
            ]

            const result = setActiveLetters(map, add)
            const parsedResult = result.values()

            expect(parsedResult.next().value.active).toBe(true)
            expect(parsedResult.next().value.active).toBe(false)
            expect(parsedResult.next().value.active).toBe(false)
            expect(parsedResult.next().value.active).toBe(true)
        })
    })

    describe('set leters data', () => {
        it('should return a new LettersMap with the specified addresses set to active', () => {
            const data: GameData = {
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
                word_locations: { '0,0,0,1,0,2,0,3,0,4': 'hello' },
            }

            const grid: LettersMap = getGridData(data)
            console.log(grid)
        })
    })
})
