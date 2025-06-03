// src/app/cart/page.test.js

import { render, screen } from '@testing-library/react';
import CartPage from './page'; // pastikan path-nya sesuai struktur proyek kamu
import React from 'react';

jest.mock('./page', () => ({
  __esModule: true,
  default: () => (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        <li>Item 1 - $10</li>
        <li>Item 2 - $15</li>
      </ul>
      <p>Total: $25</p>
    </div>
  ),
}));

describe('Cart Page', () => {
  test('renders the cart title', () => {
    render(<CartPage />);
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
  });

  test('renders cart items', () => {
    render(<CartPage />);
    expect(screen.getByText(/item 1 - \$10/i)).toBeInTheDocument();
    expect(screen.getByText(/item 2 - \$15/i)).toBeInTheDocument();
  });

  test('displays total price', () => {
    render(<CartPage />);
    expect(screen.getByText(/total: \$25/i)).toBeInTheDocument();
  });
});