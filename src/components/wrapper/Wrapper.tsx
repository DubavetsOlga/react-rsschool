import { Search } from '../search/Search';
import { SelectedItems } from '../selectedItems/SelectedItems';
import s from './style.module.css';
import { memo, ReactNode } from 'react';
import { Header } from '../header/Header';
import { CardListWrapper } from '../cardList/CardListWrapper';

type LayoutProps = {
  children?: ReactNode;
  page?: string;
  search?: string;
};

const WrapperComponent = ({
  children,
  page = '1',
  search = '',
}: LayoutProps) => {
  return (
    <div>
      <Header />
      <div className={s.layout}>
        <Search />
        <div className={s.container}>
          <CardListWrapper page={page} search={search} />
          {children}
        </div>
        <SelectedItems />
      </div>
    </div>
  );
};

WrapperComponent.displayName = 'Wrapper';

export const Wrapper = memo(WrapperComponent);
