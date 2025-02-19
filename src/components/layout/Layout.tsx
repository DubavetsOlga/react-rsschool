import { Search } from '../search/Search';
import { CardList } from '../cardList/CardList';
import { Outlet } from 'react-router';
import s from './style.module.css';

export const Layout = () => {
  return (
    <div className={s.layout}>
      <Search />
      <div className={s.container}>
        <CardList />
        <Outlet />
      </div>
    </div>
  );
};
