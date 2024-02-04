import { useCallback, useReducer } from 'react';
import { CryptoCurrencyList, CryptoRateLatest, CryptoRates, Wallet } from '../types';
import { setLocalStorage } from '../utils/utils';

type State = {
  currencyRates: CryptoRates;
  criptoRateLatest: CryptoRateLatest;
  wallet: Wallet;
}

type Action = {
  type: 'SET_CURRENCY_RATES';
  payload: CryptoRates;
} | {
  type: 'SET_CRIPTO_RATE_LATEST';
  payload: CryptoRateLatest;
} | {
  type: 'SET_WALLET';
  payload: Wallet;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENCY_RATES':
      return {
        ...state,
        currencyRates: action.payload,
      };
    case 'SET_CRIPTO_RATE_LATEST':
      return {
        ...state,
        criptoRateLatest: action.payload,
      };
    case 'SET_WALLET':
      return {
        ...state,
        wallet: action.payload,
      };
    default:
      return state;
  }
};

const getCurrencyRatesInitial = (): CryptoRates => {
  const ini = {} as CryptoRates;
  CryptoCurrencyList.forEach((currency) => {
    ini[currency] = [];
  });
  return ini as CryptoRates
}

const getWalletInitial = (): Wallet => {
  const crypto = {} as Wallet['crypto'];
  CryptoCurrencyList.forEach((currency) => {
    crypto[currency] = 0;
  });

  const ini = {
    dollar: 100000,
    crypto,
    fee: 0.01,
  } as Wallet;

  return ini as Wallet
}

const getCriptoRateLatestInitial = (): CryptoRateLatest => {
  const ini = {} as CryptoRateLatest;
  CryptoCurrencyList.forEach((currency) => {
    ini[currency] = 0;
  });
  return ini as CryptoRateLatest
}

export type CryptoGameHook = {
  state: State;
  setCurrencyRates: (payload: CryptoRates) => void;
  setCriptoRateLatest: (payload: CryptoRateLatest) => void;
  setWallet: (payload: Wallet) => void;
}





export function useCryptoGameHook() {

  const _currencyRates: CryptoRates = localStorage.getItem('currencyRates') ?
    JSON.parse(localStorage.getItem('currencyRates') || '') as CryptoRates
    : getCurrencyRatesInitial();

  const _criptoRateLatest: CryptoRateLatest = localStorage.getItem('criptoRateLatest') ?
    JSON.parse(localStorage.getItem('criptoRateLatest') || '') as CryptoRateLatest
    : getCriptoRateLatestInitial();

  const _wallet: Wallet = localStorage.getItem('wallet') ?
    JSON.parse(localStorage.getItem('wallet') || '') as Wallet
    : getWalletInitial();


  const [state, dispatch] = useReducer(reducer, {
    currencyRates: _currencyRates,
    criptoRateLatest: _criptoRateLatest,
    wallet: _wallet,
  });



  const setCurrencyRates = useCallback((payload: CryptoRates) => {
    setLocalStorage('currencyRates', JSON.stringify(payload));
    dispatch({
      type: 'SET_CURRENCY_RATES',
      payload,
    });
  }, []);

  const setCriptoRateLatest = useCallback((payload: CryptoRateLatest) => {
    setLocalStorage('criptoRateLatest', JSON.stringify(payload));
    dispatch({
      type: 'SET_CRIPTO_RATE_LATEST',
      payload,
    });
  }, []);

  const setWallet = useCallback((payload: Wallet) => {
    setLocalStorage('wallet', JSON.stringify(payload));
    dispatch({
      type: 'SET_WALLET',
      payload,
    });
  }, []);

  return {
    state,
    setCurrencyRates,
    setCriptoRateLatest,
    setWallet,
  };

}

export default useCryptoGameHook;



