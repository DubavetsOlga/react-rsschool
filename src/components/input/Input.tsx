import { Component, InputHTMLAttributes } from 'react';
import s from './style.module.css';

export class Input extends Component<InputHTMLAttributes<HTMLInputElement>> {
  render() {
    const { ...rest } = this.props;
    return <input className={s.input} {...rest} />;
  }
}
