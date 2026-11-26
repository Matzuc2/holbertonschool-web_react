import { screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '../../tests/testUtils';

test('renders the dashboard heading and logo', () => {
  renderWithProviders(<Header />);

  const headingElement = screen.getByRole('heading', { name: /school dashboard/i });
  const imgElement = screen.getByAltText('holberton logo');

  expect(headingElement).toBeInTheDocument();
  expect(imgElement).toBeInTheDocument();
});

test('logoutSection is not rendered with default context value', () => {
  renderWithProviders(<Header />);

  const logoutSection = screen.queryByText(/logout/i);

  expect(logoutSection).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  renderWithProviders(<Header />, {
    preloadedState: {
      auth: {
        user: { email: 'test@test.com', password: 'password123' },
        isLoggedIn: true,
      },
    },
  });

  const logoutSection = screen.getByText(/logout/i);
  expect(logoutSection).toBeInTheDocument();
  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('clicking logout link calls the logOut function', () => {
  const { store } = renderWithProviders(<Header />, {
    preloadedState: {
      auth: {
        user: { email: 'test@test.com', password: 'password123' },
        isLoggedIn: true,
      },
    },
  });

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(store.getState().auth).toEqual({
    user: { email: '', password: '' },
    isLoggedIn: false,
  });
});
