import { render } from '@testing-library/react'

import GameGrid from './GameGrid'

describe('GameGrid', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<GameGrid />)
        expect(baseElement).toBeTruthy()
    })
})
