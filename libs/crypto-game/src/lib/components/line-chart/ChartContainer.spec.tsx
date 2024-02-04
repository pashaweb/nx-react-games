import { render } from '@testing-library/react'

import ChartContainer from './ChartContainer'

describe('ChartContainer', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ChartContainer />)
        expect(baseElement).toBeTruthy()
    })
})
