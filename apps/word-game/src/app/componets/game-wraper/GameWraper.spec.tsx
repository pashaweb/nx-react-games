import { render } from '@testing-library/react'

import GameWraper from './GameWraper'

describe('GameWraper', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<GameWraper />)
        expect(baseElement).toBeTruthy()
    })
})
