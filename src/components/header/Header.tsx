import { ThemeToggle } from '../themeToggle/ThemeToggle';
import s from './style.module.css';

export const Header = () => {
  return (
    <header className={s.header}>
      <ThemeToggle />
    </header>
  );
};
