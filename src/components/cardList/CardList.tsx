import { ReactElement } from 'react';
import { Card } from '../card/Card';
import s from './style.module.css';
import { Spinner } from '../spinner/Spinner';
import { Pagination } from '../pagination/Pagination';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router';
import { useFetchPlanets } from '../../hooks/useFetchPlanets';
import { Path } from '../Routing';

const ITEMS_PER_PAGE = 10;

export const CardList = (): ReactElement => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search') ?? '';
  const currentPage = searchParams.get('page') ?? '1';

  const { result, loading, error } = useFetchPlanets({
    searchValue,
    currentPage,
    detail: '',
  });

  const handleClickPanel = () => {
    if (!searchParams.get('detail')) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('detail');

    navigate({
      pathname: Path.Main,
      search: createSearchParams(newSearchParams).toString(),
    });
  };

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (result.results?.length === 0) return <p>No results found.</p>;

  return (
    <div onClick={handleClickPanel}>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Terrain</th>
          </tr>
        </thead>
        <tbody>
          {result.results?.map((el) => <Card key={el.url} item={el} />)}
        </tbody>
      </table>
      <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={result.count} />
    </div>
  );
};
