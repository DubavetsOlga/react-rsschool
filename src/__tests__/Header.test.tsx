import { render, screen } from '@testing-library/react';
import { Header } from '../common/components';
import '@testing-library/jest-dom';

jest.mock('../common/components/themeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <div>Mocked ThemeToggle</div>,
}));

describe('Header Component', () => {
  test('renders the ThemeToggle component', () => {
    render(<Header />);

    expect(screen.getByText('Mocked ThemeToggle')).toBeInTheDocument();
  });
});
