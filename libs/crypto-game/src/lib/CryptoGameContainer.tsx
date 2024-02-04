import { CryptoGame } from './crypto-game'
import { CryptoGameProvider } from './hooks/CryptoGameContext'

export const CryptoGameContainer = () => {
    console.log('CryptoGameContainer')

    return (
        <CryptoGameProvider>
            <CryptoGame />
        </CryptoGameProvider>
    )
}
