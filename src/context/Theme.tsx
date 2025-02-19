import { useState, useEffect, ReactNode } from 'react';
import s from './style.module.css';
import { THEMES } from './constants.ts';
import { ThemeContext } from './ThemeContext.tsx';

type ThemeProps = {
  children: ReactNode;
};

export const Theme = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState<string>(() => {
    return JSON.parse(localStorage.getItem('theme') || 'null') || THEMES.LIGHT;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
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
