import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with children', () => {
  render(<Button>Click me</Button>);
  const buttonElement = screen.getByText('Click me');
  expect(buttonElement).toBeInTheDocument();
});

test('applies primary variant by default', () => {
  render(<Button>Test Button</Button>);
  const buttonElement = screen.getByText('Test Button');
  expect(buttonElement).toHaveClass('primary');
}); 