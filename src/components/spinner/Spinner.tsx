import s from './Spinner.module.css';
import { ReactElement } from 'react';

export const Spinner = (): ReactElement => {
  return (
    <div className={s.spinner}>
      <div className={s.loader}></div>
    </div>
  );
};

export default Spinner;
