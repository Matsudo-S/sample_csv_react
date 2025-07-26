import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders header with logo', () => {
  render(<Header />);
  const logoElement = screen.getByText('Blog App');
  expect(logoElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<Header />);
  const homeLink = screen.getByText('Home');
  const aboutLink = screen.getByText('About');
  const contactLink = screen.getByText('Contact');
  
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
}); 