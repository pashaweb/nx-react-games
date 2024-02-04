import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react';

import { CryptoGame } from './crypto-game';


describe('CryptoGame', () => {

  beforeEach(() => {
    localStorage.clear();
  });


  test('renders without error', () => {
    const { container } = renderComponent();
    expect(container).toBeTruthy();
  });

  test('should initialize state from localStorage', () => {
    const mockCurrencyRates = { USD: 1.2 };
    const mockCriptoRateLatest = { BTC: 50000 };
    const mockWallet = { BTC: 2 };

    localStorage.setItem('currencyRates', JSON.stringify(mockCurrencyRates));
    localStorage.setItem('criptoRateLatest', JSON.stringify(mockCriptoRateLatest));
    localStorage.setItem('wallet', JSON.stringify(mockWallet));

    const { container } = renderComponent();
    console.log(container.innerHTML);

    expect(container).toBeTruthy();
  });
});

const renderComponent = () => {
  return render(<CryptoGame />);
}
