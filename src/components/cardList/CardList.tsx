import { ReactElement, useCallback } from 'react';
import { Card } from '../card/Card';
import s from './style.module.css';
import { Spinner } from '../spinner/Spinner';
import { Pagination } from '../pagination/Pagination';
import { useSearchParams } from 'react-router';
import { useGetPlanetsQuery } from '../../api/planets/planetsApi.ts';
import { THEMES } from '../../context/constants.ts';
import { ThemeContext } from '../../context/ThemeContext.tsx';

const ITEMS_PER_PAGE = 10;

export const CardList = (): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('search') ?? '';
  const currentPage = searchParams.get('page') ?? '1';
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : THEMES.LIGHT;

  const { result, loading, error } = useFetchPlanets({
    searchValue,
    currentPage,
    detail: '',
  });

  const handleClickPanel = useCallback(() => {
    if (!searchParams.get('detail')) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('detail');
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  if (result.results?.length === 0) return <p>No results found.</p>;

  return (
    <div role="button" tabIndex={0} aria-label="Close detail view">
      <table
        className={`${s.table} ${theme === THEMES.LIGHT ? '' : s.darkTheme}`}
      >
        <thead onClick={handleClickPanel}>
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
