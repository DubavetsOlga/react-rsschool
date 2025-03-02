import { ReactElement } from 'react';
import s from './spinner.module.css';

export const Spinner = (): ReactElement => {
  return (
    <div className={s.spinner}>
      <div className={s.loader}></div>
    </div>
  );
};

export default Spinner;
