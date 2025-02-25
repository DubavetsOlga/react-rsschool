import { useState, useEffect, ReactNode } from 'react';
import s from './style.module.css';
import { THEMES } from './constants';
import { ThemeContext } from './ThemeContext';

type ThemeProps = {
  children: ReactNode;
};

export const Theme = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState<string>(THEMES.LIGHT);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(JSON.parse(storedTheme));
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('theme', JSON.stringify(theme));
    }
  }, [theme, isMounted]);

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
