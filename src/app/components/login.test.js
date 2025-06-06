import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './login';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ access_token: 'dummy_token' }),
    })
  );
  window.alert = jest.fn(); // mock alert
  localStorage.clear();
});

test('shows error if email is empty', async () => {
  render(<LoginPage />);
  fireEvent.click(screen.getByText(/login/i));
  expect(await screen.findByText(/wajib diisi/i)).toBeInTheDocument();
});

test('successful login', async () => {
  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'john@mail.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'changeme' },
  });
  fireEvent.click(screen.getByText(/login/i));

  await waitFor(() =>
    expect(localStorage.getItem('access_token')).toBe('dummy_token')
  );
  expect(window.alert).toHaveBeenCalledWith('Login berhasil!');
});