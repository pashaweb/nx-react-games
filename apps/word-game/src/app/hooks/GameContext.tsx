import { GameData } from '@word-game/types'
import { createContext } from 'react'
import useGameHook, { UseGameHook } from './game-hook'

export const GameHookContext = createContext<UseGameHook | null>(null as never)

export type GameProviderProps = {
    children: React.ReactNode
    data: GameData
}

export const GameProvider = ({ children, data }: GameProviderProps) => {
    const hook = useGameHook(data)
    return (
        <GameHookContext.Provider value={hook}>
            {JSON.stringify(hook.state.letters)}
            {children}
        </GameHookContext.Provider>
    )
}
