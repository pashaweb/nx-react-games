import { act, renderHook } from '@testing-library/react'
import * as React from 'react'

import useGamesData from './games-data'

describe('useGamesData', () => {
    it('should render successfully', () => {
        const { result } = renderHook(() => useGamesData())

        expect(result.current.count).toBe(0)

        act(() => {
            result.current.increment()
        })

        expect(result.current.count).toBe(1)
    })
})
