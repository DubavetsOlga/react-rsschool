import { Search } from '../search/Search';
import { CardList } from '../cardList/CardList';
import { Outlet } from 'react-router';
import s from './style.module.css';

const Layout = () => {
  return (
    <div>
      <Search />
      <div className={s.container}>
        <CardList />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
