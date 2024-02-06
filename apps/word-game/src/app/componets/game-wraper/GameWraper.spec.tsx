import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import GameWraper from './GameWraper'

global.fetch = vi.fn()

function createFetchResponse() {
    return { json: () => new Promise((resolve) => resolve([])) }
}

describe('GameWraper', () => {
    it('should render successfully', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        fetch.mockResolvedValue(createFetchResponse())
        const { baseElement } = render(<GameWraper />)
        expect(baseElement).toBeTruthy()
    })
})
