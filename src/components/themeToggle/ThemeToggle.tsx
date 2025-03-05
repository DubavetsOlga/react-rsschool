import { useContext } from 'react';
import { Button } from '../button/Button';
import { THEMES } from '../../common/context/constants';
import { ThemeContext } from '../../common/context/ThemeContext';

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

  return <Button onClick={toggleTheme}>Toggle Theme</Button>;
};
