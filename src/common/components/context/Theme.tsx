import { useState, useEffect, ReactNode } from 'react';
import s from './style.module.css';
import { THEMES } from './constants';
import { ThemeContext } from './ThemeContext';

type ThemeProps = {
  children: ReactNode;
  initialTheme?: string;
};

export const Theme = ({ children, initialTheme }: ThemeProps) => {
  const [theme, setTheme] = useState<string>(initialTheme || THEMES.LIGHT);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = JSON.parse(localStorage.getItem('theme') || 'null');
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', JSON.stringify(theme));
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`${s.themeContainer} ${theme === THEMES.LIGHT ? s.lightThemeContainer : s.darkThemeContainer}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
