import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '@testing-library/jest-dom';

describe('ThemeContext', () => {
  test('default context value is undefined', () => {
    const ConsumerComponent = () => {
      const context = useContext(ThemeContext);
      return <div>{context ? 'Context exists' : 'Context is undefined'}</div>;
    };

    render(<ConsumerComponent />);

    expect(screen.getByText('Context is undefined')).toBeInTheDocument();
  });

  test('provides theme and setTheme to consumers', () => {
    const mockSetTheme = jest.fn();
    const mockThemeContext = {
      theme: 'light',
      setTheme: mockSetTheme,
    };

    const ConsumerComponent = () => {
      const context = useContext(ThemeContext);
      return (
        <div>
          <div>Theme: {context?.theme}</div>
          <button onClick={() => context?.setTheme('dark')}>
            Toggle Theme
          </button>
        </div>
      );
    };

    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ConsumerComponent />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Theme: light')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Theme'));

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
