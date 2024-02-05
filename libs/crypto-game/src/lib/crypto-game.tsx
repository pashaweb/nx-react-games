import { useCallback, useEffect } from 'react'
import CurrencyTraderBox from './components/currency-trader-box/CurrencyTraderBox'
import ChartContainer from './components/line-chart/ChartContainer'
import styles from './crypto-game.module.scss'
import useCryptoGameHook from './hooks/crypto-game-hook'
import { CryptoCurrency, CryptoData, currencyColors } from './types'
import {
    buyCrypto,
    buyUsd,
    getUpdatededCriptoRateLatest,
    getUpdatededCryptoRates,
} from './utils/utils'

export function CryptoGame() {
    const { state, setCurrencyRates, setCriptoRateLatest, setWallet } =
        useCryptoGameHook()

    const { wallet, criptoRateLatest, currencyRates } = state

    const fetchRates = useCallback(async () => {
        try {
            const response = await fetch(
                'https://api.coincap.io/v2/assets?limit=10'
            )
            const data = await response.json()
            const newRates = getUpdatededCryptoRates(
                currencyRates,
                data.data as CryptoData[]
            )
            const newRatesLatest = getUpdatededCriptoRateLatest(
                criptoRateLatest,
                data.data as CryptoData[]
            )
            setCurrencyRates(newRates)
            setCriptoRateLatest(newRatesLatest)
        } catch (error) {
            console.log('error', error)
        }
    }, [currencyRates, setCurrencyRates, criptoRateLatest, setCriptoRateLatest])

    const handleBuyCrypto = (name: CryptoCurrency, amount: number) => {
        const {
            totalValInUsd: totalValInUsdAfterTransfer,
            totalValInCrypto: totalValInCryptoAfterTransfer,
        } = buyCrypto(
            wallet.dollar,
            wallet.crypto[name],
            amount,
            criptoRateLatest[name],
            wallet.fee
        )

        const newWallet = { ...wallet }
        newWallet.dollar = totalValInUsdAfterTransfer
        newWallet.crypto[name] = totalValInCryptoAfterTransfer
        console.log('buy', name, amount, newWallet)
        setWallet(newWallet)
    }

    const handleSellCrypto = (name: CryptoCurrency, amount: number) => {
        console.log('sell', criptoRateLatest[name])

        const {
            totalValInUsd: totalValInUsdAfterTransfer,
            totalValInCrypto: totalValInCryptoAfterTransfer,
        } = buyUsd(
            wallet.dollar,
            wallet.crypto[name],
            amount,
            criptoRateLatest[name],
            wallet.fee
        )

        const newWallet = { ...wallet }
        newWallet.dollar = totalValInUsdAfterTransfer
        newWallet.crypto[name] = totalValInCryptoAfterTransfer
        console.log('sell', name, amount, newWallet)
        setWallet(newWallet)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchRates()
        }, 1000)
        return () => clearInterval(interval)
    }, [fetchRates])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to CryptoGame! </h1>
            <div className={styles.myMoney}>
                <img src="/images/usd.png" alt="wallet" />
                <div className={styles.title}>
                    <label>My wallet:</label>
                    <div>{wallet.dollar}$</div>
                </div>
            </div>

            <div className={styles.fakeMasonry}>
                {[...Object.entries(wallet.crypto)].map((currency, i) => {
                    const [name, coins] = currency

                    return (
                        <CurrencyTraderBox
                            key={name + i}
                            name={name as CryptoCurrency}
                            coins={coins}
                            buyCrypto={(
                                name: CryptoCurrency,
                                amount: number
                            ) => {
                                handleBuyCrypto(name, amount)
                            }}
                            sellCrypto={(
                                name: CryptoCurrency,
                                amount: number
                            ) => {
                                handleSellCrypto(name, amount)
                            }}
                        >
                            <ChartContainer
                                chartData={
                                    currencyRates[name as CryptoCurrency]
                                }
                                color={currencyColors[name as CryptoCurrency]}
                            />

                            <p>
                                <label>Coin:</label>
                                <br /> <b>{coins}</b>
                            </p>

                            <p>
                                <label>Value in USD:</label>
                                <br />{' '}
                                <b>
                                    {coins *
                                        criptoRateLatest[
                                            name as CryptoCurrency
                                        ]}
                                </b>
                            </p>
                        </CurrencyTraderBox>
                    )
                })}
            </div>
        </div>
    )
}
