import { memo, use } from 'react';
import { ResponseType } from '../../common/types';
import { fetchData } from '../../common/utils';
import { CardList } from './CardList';

type Props = {
  page?: string;
  search?: string;
};

const CardListWrapperComponent = ({ page = '1', search = '' }: Props) => {
  const planetsData: ResponseType | null = use(
    fetchData<ResponseType>(
      `https://swapi.dev/api/planets/?search=${encodeURIComponent(search)}&page=${page}`
    )
  );

  if (!planetsData) {
    return <div>No planets data available.</div>;
  }

  return (
    <CardList
      results={planetsData?.results || []}
      count={planetsData?.count || 0}
    />
  );
};

CardListWrapperComponent.displayName = 'CardListWrapper';

export const CardListWrapper = memo(CardListWrapperComponent);
