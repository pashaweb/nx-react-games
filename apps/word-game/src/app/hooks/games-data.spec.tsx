import { renderHook } from '@testing-library/react'

import useGamesData from './games-data'

describe('useGamesData', () => {
    it('should render successfully', () => {
        const { result } = renderHook(() => useGamesData())

        expect(result.current.state).toBeTruthy()
    })
})
