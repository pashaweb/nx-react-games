import { CryptoCurrencyList, CryptoData, CryptoRateLatest, CryptoRates } from "../types";

// Set a value in localStorage
export const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

// Get a value from localStorage
export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key);
}

// Remove a value from localStorage
export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

// Clear all localStorage
export const clearLocalStorage = () => {
    localStorage.clear();
}

export const getUpdatededCryptoRates = (cryptoRates: CryptoRates, data: CryptoData[]) => {
    const max = 100;

    const updatedCryptoRates: CryptoRates = { ...cryptoRates };
    for (const k in CryptoCurrencyList) {
        const key = CryptoCurrencyList[k];
        const keyData = data.find((item) => item.id === key);
        if (keyData) {

            updatedCryptoRates[key as keyof CryptoRates].push(Number(keyData.priceUsd));
        }
    }
    for (const k in updatedCryptoRates) {
        const key = k as keyof CryptoRates;
        if (updatedCryptoRates[key].length > max) {
            updatedCryptoRates[key].shift();
        }
    }
    return updatedCryptoRates;
}


export const getUpdatededCriptoRateLatest = (criptoRateLatest: CryptoRateLatest, data: CryptoData[]): CryptoRateLatest => {
    const updatedCriptoRateLatest: CryptoRateLatest = { ...criptoRateLatest };
    for (const k in CryptoCurrencyList) {
        const key = CryptoCurrencyList[k];
        const keyData = data.find((item) => item.id === key);
        if (keyData) {
            updatedCriptoRateLatest[key as keyof CryptoRateLatest] = Number(keyData.priceUsd);
        }
    }
    return updatedCriptoRateLatest;
}

export type BuyCrypto = (
    totalValInUsd: number,
    totalValInCrypto: number,
    valueToTransferInUsd: number,
    priceInUsd: number,
    fee: number
) => {
    totalValInUsd: number,
    totalValInCrypto: number
}

export const buyCrypto: BuyCrypto = (
    totalValInUsd,
    totalValInCrypto,
    valueToTransferInUsd,
    priceInUsd,
    fee
) => {
    let totalValInUsdAfterTransfer = totalValInUsd - valueToTransferInUsd - (valueToTransferInUsd * fee);
    if (totalValInUsdAfterTransfer < 0) {
        valueToTransferInUsd = totalValInUsd - (totalValInUsd * fee);
        totalValInUsdAfterTransfer = 0;
    }

    const totalValInCryptoAfterTransfer = totalValInCrypto + (valueToTransferInUsd / priceInUsd);
    return {
        totalValInUsd: totalValInUsdAfterTransfer,
        totalValInCrypto: totalValInCryptoAfterTransfer
    }
}

type BuyUsd = (
    totalValInUsd: number,
    totalValInCrypto: number,
    valueToTransferInUsd: number,
    priceInUsd: number,
    fee: number
) =>
    {
        totalValInUsd: number,
        totalValInCrypto: number
    }

export const buyUsd: BuyUsd = (totalValInUsd,
    totalValInCrypto,
    valueToTransferInUsd,
    priceInUsd,
    fee) => {
    let totalValInCryptoAfterTransfer = totalValInCrypto - (valueToTransferInUsd / priceInUsd);
    if (totalValInCryptoAfterTransfer < 0) {
        valueToTransferInUsd = totalValInCrypto * priceInUsd;
        totalValInCryptoAfterTransfer = 0;
    }
    const totalValInUsdAfterTransfer = totalValInUsd + valueToTransferInUsd - (valueToTransferInUsd * fee);

    return {
        totalValInUsd: totalValInUsdAfterTransfer,
        totalValInCrypto: totalValInCryptoAfterTransfer
    }
}
