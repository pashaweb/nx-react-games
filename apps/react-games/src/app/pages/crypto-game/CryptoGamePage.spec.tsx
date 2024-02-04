import{describe, expect, it} from 'vitest';
import { render } from '@testing-library/react';

import CryptoGamePage from './CryptoGamePage';

describe('CryptoGamePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CryptoGamePage />);
    expect(baseElement).toBeTruthy();
  });
});
