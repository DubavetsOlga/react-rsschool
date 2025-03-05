import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { THEMES } from '../common/context/constants';
import { Theme } from '../common/context/Theme';
import { ThemeContext } from '../common/context/ThemeContext';
import s from '../common/context/style.module.css';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Theme Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('initializes theme from localStorage', () => {
    window.localStorage.setItem('theme', JSON.stringify(THEMES.DARK));

    render(
      <Theme>
        <div>Test Child</div>
      </Theme>
    );

    const container = screen.getByText('Test Child').parentElement;
    expect(container).toHaveClass('darkThemeContainer');
  });

  test('defaults to light theme if localStorage is empty', () => {
    render(
      <Theme>
        <div>Test Child</div>
      </Theme>
    );

    const container = screen.getByText('Test Child').parentElement;
    expect(container).toHaveClass('lightThemeContainer');
  });

  test('applies correct CSS classes based on theme', () => {
    const { rerender } = render(
      <Theme>
        <div>Test Child</div>
      </Theme>
    );

    let container = screen.getByText('Test Child').parentElement;
    expect(container).toHaveClass('lightThemeContainer');

    rerender(
      <ThemeContext.Provider
        value={{ theme: THEMES.DARK, setTheme: jest.fn() }}
      >
        <div className={`${s.themeContainer} ${s.darkThemeContainer}`}>
          <div>Test Child</div>
        </div>
      </ThemeContext.Provider>
    );

    container = screen.getByText('Test Child').parentElement;
    expect(container).toHaveClass('darkThemeContainer');
  });
});
