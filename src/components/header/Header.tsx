import { ThemeToggle } from '../themeToggle/ThemeToggle';
import s from '../header/style.module.css';

export const Header = () => {
  return (
    <header className={s.header}>
      <ThemeToggle />
    </header>
  );
};
