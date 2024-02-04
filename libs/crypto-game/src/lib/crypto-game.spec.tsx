import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import { CryptoGame } from './crypto-game'
import { CryptoRateLatest, CryptoRates, Wallet } from './types'

describe('CryptoGame', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    test('renders without error', () => {
        const { container } = renderComponent()
        expect(container).toBeTruthy()
    })

    test('should initialize state from localStorage', () => {
        const mockCurrencyRates: CryptoRates = {
            bitcoin: [50000, 60000, 70000, 80000, 90000],
            ethereum: [3000, 4000, 5000, 6000, 7000],
            dogecoin: [0.1, 0.2, 0.3, 0.4, 0.5],
            cardano: [1, 2, 3, 4, 5],
        }
        const mockCriptoRateLatest: CryptoRateLatest = {
            bitcoin: 60000,
            ethereum: 4000,
            dogecoin: 0.2,
            cardano: 2,
        }

        const mockWallet: Wallet = {
            dollar: 1000,
            fee: 0.01,
            crypto: {
                bitcoin: 1,
                ethereum: 2,
                dogecoin: 3,
                cardano: 4,
            },
        }

        localStorage.setItem('currencyRates', JSON.stringify(mockCurrencyRates))
        localStorage.setItem(
            'criptoRateLatest',
            JSON.stringify(mockCriptoRateLatest)
        )
        localStorage.setItem('wallet', JSON.stringify(mockWallet))

        const { container } = renderComponent()
        console.log(container.innerHTML)

        expect(container).toBeTruthy()
    })
})

const renderComponent = () => {
    return render(<CryptoGame />)
}
