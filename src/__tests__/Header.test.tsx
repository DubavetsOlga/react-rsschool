import { render, screen } from '@testing-library/react';
import { Header } from '../components';
import '@testing-library/jest-dom';

jest.mock('../components/themeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <div>Mocked ThemeToggle</div>,
}));

describe('Header Component', () => {
  test('renders the ThemeToggle component', () => {
    render(<Header />);

    expect(screen.getByText('Mocked ThemeToggle')).toBeInTheDocument();
  });
});
