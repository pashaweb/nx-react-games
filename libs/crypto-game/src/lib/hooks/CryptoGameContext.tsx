import { createContext } from 'react'
import { useCryptoGameHook, type CryptoGameHook } from './crypto-game-hook'

//const hook = useCryptoGameHook();

export const CryptoGameContext = createContext<CryptoGameHook>(null as never)

export type CryptoGameProviderProps = {
    children: React.ReactNode
}

export const CryptoGameProvider = ({ children }: CryptoGameProviderProps) => {
    const hook = useCryptoGameHook()
    return (
        <CryptoGameContext.Provider value={hook}>
            {children}
        </CryptoGameContext.Provider>
    )
}
