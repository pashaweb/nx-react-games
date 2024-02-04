import { CryptoGame } from '@crypto-game/crypto-game'

/* eslint-disable-next-line */
export interface CryptoGamePageProps {}

export function CryptoGamePage(props: CryptoGamePageProps) {
    return (
        <main>
            <h1>Crypto Game</h1>
            <p>
                This is a game where you guess the name of a cryptocurrency
                based on its ticker symbol.
            </p>
            <CryptoGame />
        </main>
    )
}

export default CryptoGamePage
