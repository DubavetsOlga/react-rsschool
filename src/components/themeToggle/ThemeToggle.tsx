import { useContext } from 'react';
import { Button } from '../button/Button.tsx';
import { THEMES } from '../../context/constants';
import { ThemeContext } from '../../context/ThemeContext.tsx';

export const ThemeToggle = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  const { setTheme } = context;

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  return (
    <div>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
    </div>
  );
};
