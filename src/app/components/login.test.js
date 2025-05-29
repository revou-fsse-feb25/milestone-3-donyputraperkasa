// src/app/components/login.test.js
import { render, screen } from '@testing-library/react';
import LoginPage from './login';

test('renders login form', () => {
  render(<LoginPage />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});