import { fireEvent, render, screen } from '@testing-library/react';
import { THEMES } from '../context/constants';
import { ThemeToggle } from '../components';
import { ThemeContext } from '../context/ThemeContext';
import { ReactNode } from 'react';
import '@testing-library/jest-dom';

jest.mock('../components/button/Button', () => ({
  Button: ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: ReactNode;
  }) => <button onClick={onClick}>{children}</button>,
}));

describe('ThemeToggle Component', () => {
  const mockSetTheme = jest.fn();

  const mockThemeContext = {
    theme: THEMES.LIGHT,
    setTheme: mockSetTheme,
  };

  test('renders the toggle theme button', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
  });

  test('calls setTheme with the correct theme when the button is clicked', () => {
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByText('Toggle Theme'));

    expect(mockSetTheme).toHaveBeenCalledWith(expect.any(Function));

    const updaterFunction = mockSetTheme.mock.calls[0][0];
    expect(updaterFunction(THEMES.LIGHT)).toBe(THEMES.DARK);

    fireEvent.click(screen.getByText('Toggle Theme'));

    expect(mockSetTheme).toHaveBeenCalledWith(expect.any(Function));

    const secondUpdaterFunction = mockSetTheme.mock.calls[1][0];
    expect(secondUpdaterFunction(THEMES.DARK)).toBe(THEMES.LIGHT);
  });

  test('throws an error if used outside of a ThemeProvider', () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => render(<ThemeToggle />)).toThrow(
      'ThemeToggle must be used within a ThemeProvider'
    );

    console.error = originalError;
  });
});
