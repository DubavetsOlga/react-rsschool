import { InputHTMLAttributes, ReactElement } from 'react';
import s from './style.module.css';

export const Input = ({
  ...rest
}: InputHTMLAttributes<HTMLInputElement>): ReactElement => {
  return <input className={s.input} {...rest} />;
};
