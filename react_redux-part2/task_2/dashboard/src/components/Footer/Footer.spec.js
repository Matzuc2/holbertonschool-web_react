import { screen } from '@testing-library/react';
import Footer from './Footer';
import { renderWithProviders } from '../../tests/testUtils';

test('It should render footer with copyright text', () => {
  renderWithProviders(<Footer />);

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'))
  expect(footerParagraph).toHaveTextContent(/holberton school/i)
});

test('Contact us link is not displayed when user is logged out', () => {
  renderWithProviders(<Footer />);

  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  renderWithProviders(<Footer />, {
    preloadedState: {
      auth: {
        user: { email: 'test@test.com', password: 'password123' },
        isLoggedIn: true,
      },
    },
  });

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});
