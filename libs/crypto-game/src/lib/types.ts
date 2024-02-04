export type CryptoData = {
    id: string
    rank: string
    symbol: string
    name: string
    supply: string
    maxSupply: string
    marketCapUsd: string
    volumeUsd24Hr: string
    priceUsd: string
    changePercent24Hr: string
    vwap24Hr: string
    explorer: string
}

export const CryptoCurrencyList = ['bitcoin', 'ethereum', 'dogecoin', 'cardano'] as const

export type CryptoCurrency = (typeof CryptoCurrencyList)[number];
export const currencyColors: {
    [key in CryptoCurrency]: string
} = {
    bitcoin: '#f94144ff',
    ethereum: '#f9844aff',
    cardano: '#43aa8bff',
    dogecoin: '#277da1ff',
}


export type CryptoRates = {
    [key in CryptoCurrency]: number[]
};

export type CryptoRateLatest = {
    [key in CryptoCurrency]: number
};

export type Wallet = {
    dollar: number
    crypto: {
        [key in CryptoCurrency]: number
    }
    fee: number
}
