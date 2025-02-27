import { Search } from '../search/Search';
import { SelectedItems } from '../selectedItems/SelectedItems';
import s from './style.module.css';
import { memo, ReactNode, Suspense } from 'react';
import { Header } from '../header/Header';
import { CardListWrapper } from '../cardList/CardListWrapper';
import { Spinner } from '../spinner/Spinner';

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
        <Suspense fallback={<Spinner />}>
          <div className={s.container}>
            <CardListWrapper page={page} search={search} />
            {children}
          </div>
        </Suspense>
        <SelectedItems />
      </div>
    </div>
  );
};

WrapperComponent.displayName = 'Wrapper';

export const Wrapper = memo(WrapperComponent);
