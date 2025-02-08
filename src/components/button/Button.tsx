import { ButtonHTMLAttributes, ReactElement } from 'react';
import s from './style.module.css';

export const Button = ({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
  return (
    <button className={s.button} {...rest}>
      {children}
    </button>
  );
};
