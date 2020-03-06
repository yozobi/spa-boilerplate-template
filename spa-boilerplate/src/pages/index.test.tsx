import { render } from '@testing-library/react';
import React, { Suspense } from 'react';
import HomePage from './';

describe('Index Page', () => {
  test('That it renders OK', async () => {
    const { findByText } = render(
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>,
    );
    expect(await findByText(/Hello World/i)).not.toBeNull();
  });
});
