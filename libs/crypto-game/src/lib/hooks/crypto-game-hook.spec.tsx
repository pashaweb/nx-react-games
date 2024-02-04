// FILEPATH: /home/pavel/DEV/react-games/libs/crypto-game/src/lib/hooks/crypto-game-hook.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCryptoGameHook } from './crypto-game-hook';

describe('useCryptoGameHook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize state from localStorage', () => {
    const mockCurrencyRates = { USD: 1.2 };
    const mockCriptoRateLatest = { BTC: 50000 };
    const mockWallet = { BTC: 2 };

    localStorage.setItem('currencyRates', JSON.stringify(mockCurrencyRates));
    localStorage.setItem('criptoRateLatest', JSON.stringify(mockCriptoRateLatest));
    localStorage.setItem('wallet', JSON.stringify(mockWallet));

    const { result } = renderHook(() => useCryptoGameHook());

    expect(result.current.state.currencyRates).toEqual(mockCurrencyRates);
    expect(result.current.state.criptoRateLatest).toEqual(mockCriptoRateLatest);
    expect(result.current.state.wallet).toEqual(mockWallet);
  });

  it('should update currencyRates state and localStorage when setCurrencyRates is called', () => {
    const { result } = renderHook(() => useCryptoGameHook());
    const newCurrencyRates = { USD: 1.3 };

    act(() => {
      result.current.setCurrencyRates(newCurrencyRates);
    });

    expect(result.current.state.currencyRates).toEqual(newCurrencyRates);
    expect(JSON.parse(localStorage.getItem('currencyRates') || '')).toEqual(newCurrencyRates);
  });

  it('should update criptoRateLatest state and localStorage when setCriptoRateLatest is called', () => {
    const { result } = renderHook(() => useCryptoGameHook());
    const newCriptoRateLatest = {
      bitcoin: 50000,
      ethereum: 2000,
      dogecoin: 0.5,
    };
    act(() => {
      result.current.setCriptoRateLatest(newCriptoRateLatest);
    });

    expect(result.current.state.criptoRateLatest).toEqual(newCriptoRateLatest);
    expect(JSON.parse(localStorage.getItem('criptoRateLatest') || '')).toEqual(newCriptoRateLatest);
  });

  it('should update wallet state and localStorage when setWallet is called', () => {
    const { result } = renderHook(() => useCryptoGameHook());
    const newWallet = { BTC: 3 };

    act(() => {
      result.current.setWallet(newWallet);
    });

    expect(result.current.state.wallet).toEqual(newWallet);
    expect(JSON.parse(localStorage.getItem('wallet') || '')).toEqual(newWallet);
  });
});
