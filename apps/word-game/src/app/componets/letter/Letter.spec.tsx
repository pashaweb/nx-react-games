import { render } from '@testing-library/react'

import Letter from './Letter'

describe('Letter', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Letter />)
        expect(baseElement).toBeTruthy()
    })
})
