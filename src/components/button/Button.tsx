import { ButtonHTMLAttributes, Component } from 'react';
import s from './style.module.css';

export class Button extends Component<ButtonHTMLAttributes<HTMLButtonElement>> {
  render() {
    const { children, ...rest } = this.props;
    return (
      <button className={s.button} {...rest}>
        {children}
      </button>
    );
  }
}
