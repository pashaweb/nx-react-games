import { Route, Routes } from 'react-router-dom'
import GameWraper from './componets/game-wraper/GameWraper'

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
