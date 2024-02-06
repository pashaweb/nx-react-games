import { render } from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'
import App from './app'

global.fetch = vi.fn()

function createFetchResponse() {
    return { json: () => new Promise((resolve) => resolve([])) }
}

describe('App', () => {
    it('should render successfully', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        fetch.mockResolvedValue(createFetchResponse())
        const { baseElement } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )
        expect(baseElement).toBeTruthy()
    })

    // it('should have a greeting as the title', () => {
    //     const { getByText } = render(<App />)
    //     expect(getByText(/Welcome word-game/gi)).toBeTruthy()
    // })
})
