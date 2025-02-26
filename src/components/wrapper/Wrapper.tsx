import { Search } from '../search/Search';
import { CardList } from '../cardList/CardList';
import { SelectedItems } from '../selectedItems/SelectedItems';
import s from './style.module.css';
import { ReactNode } from 'react';
import { Header } from '../header/Header';
import { ResponseType } from '../../common/types';

type LayoutProps = {
  children?: ReactNode;
  planetsData: ResponseType | null;
};

export const Wrapper = ({ children, planetsData }: LayoutProps) => {
  return (
    <div>
      <Header />
      <div className={s.layout}>
        <Search />
        <div className={s.container}>
          <CardList
            results={planetsData?.results || []}
            count={planetsData?.count || 0}
          />
          {children}
        </div>
        <SelectedItems />
      </div>
    </div>
  );
};
