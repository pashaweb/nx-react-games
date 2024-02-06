// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom'
//import styles from './app.module.scss';
import NavBar from './components/NavBar'
import CryptoGamePage from './pages/crypto-game/CryptoGamePage'
import Home from './pages/home/Home'
import WordGamePage from './pages/word-game/WordGamePage'

export function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crypto-game" element={<CryptoGamePage />} />
                <Route path="/word-game/*" element={<WordGamePage />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </>
    )
}

export default App
