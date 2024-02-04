import { render } from '@testing-library/react'

import CurrencyTraderBox from './CurrencyTraderBox'

describe('CurrencyTraderBox', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CurrencyTraderBox />)
        expect(baseElement).toBeTruthy()
    })
})
