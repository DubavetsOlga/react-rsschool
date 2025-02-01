import s from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={s.spinner}>
      <div className={s.loader}></div>
    </div>
  );
};

export default Spinner;
