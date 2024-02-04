import { render } from '@testing-library/react';

import WordGamePage from './WordGamePage';

describe('WordGamePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WordGamePage />);
    expect(baseElement).toBeTruthy();
  });
});
