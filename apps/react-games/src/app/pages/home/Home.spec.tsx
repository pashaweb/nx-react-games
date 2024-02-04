import{describe, expect, it} from 'vitest';

import { render } from '@testing-library/react';

import Home from './Home';

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });
});
