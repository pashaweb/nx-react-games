import { Route, Routes } from 'react-router-dom'
import GameWraper from './componets/game-wraper/GameWraper'
import { GameData } from './hooks/game-hook'

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

export function App() {
    return (
        <Routes>
            <Route path="/*" element={<GameWraper />}>
                <Route path=":gameID" element={<GameWraper />} />
            </Route>
        </Routes>
    )
}

export default App
