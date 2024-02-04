import React, { useState } from 'react'
import { CryptoCurrency } from '../../types'
import styles from './CurrencyTraderBox.module.scss'

export type CurrencyTraderBoxProps = {
    children?: React.ReactNode
    name: CryptoCurrency
    coins: number
    buyCrypto: (name: CryptoCurrency, amaunt: number) => void
    sellCrypto: (name: CryptoCurrency, amaunt: number) => void
}
export function CurrencyTraderBox(props: CurrencyTraderBoxProps) {
    const { name, coins, buyCrypto, sellCrypto } = props
    const [amount, setAmount] = useState(1000)
    const children = props.children

    return (
        <div className={styles.card}>
            <img src={`/images/${name}.png`} alt="fsw" />
            <h2>{name}</h2>
            {children}

            <div className={styles['amount-container']}>
                <button onClick={() => setAmount(amount + 10)}>+10</button>
                <div>${amount}</div>
                <button onClick={() => setAmount(amount - 10)}>-10</button>
            </div>
            <button
                className={styles['buy-button']}
                onClick={() => buyCrypto(name, amount)}
            >
                Buy {amount}$
            </button>
            <button
                className={styles['sell-button']}
                onClick={() => sellCrypto(name, amount)}
            >
                Sell {amount}$
            </button>
        </div>
    )
}

export default CurrencyTraderBox
