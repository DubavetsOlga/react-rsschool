import { InputHTMLAttributes, ReactElement, forwardRef } from 'react';
import s from './style.module.css';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...rest }, ref): ReactElement => {
  return <input className={s.input} ref={ref} {...rest} />;
});

Input.displayName = 'Input';
