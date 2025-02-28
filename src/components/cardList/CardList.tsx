import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'react-router';
import { Spinner } from '../spinner/Spinner';
import { Pagination } from '../pagination/Pagination';
import { Card } from '../card/Card';
import { useGetPlanetsQuery } from '../../api/planets/planetsApi';
import { THEMES } from '../context/constants';
import { ThemeContext } from '../context/ThemeContext';
import s from './style.module.css';

const ITEMS_PER_PAGE = 10;

export const CardList = (): ReactElement => {
  const [errMsg, setErrMsg] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('search') ?? '';
  const currentPage = searchParams.get('page') ?? '1';
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : THEMES.LIGHT;

  const { data, isLoading, isFetching, error } = useGetPlanetsQuery({
    page: currentPage,
    searchValue,
  });

  useEffect(() => {
    if (error) {
      let errMsg = 'Some error occurred';
      if ('data' in error) {
        const errData = error.data as Error;
        if ('message' in errData) {
          errMsg = errData.message as string;
        }
      }
      setErrMsg(errMsg);
    }
  }, [error]);

  const handleClickPanel = useCallback(() => {
    if (!searchParams.get('detail')) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('detail');
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  if (isLoading || isFetching) return <Spinner />;
  if (error) return <div>Error: {errMsg}</div>;
  if (data?.results?.length === 0) return <p>No results found.</p>;

  return (
    <div role="button" tabIndex={0} aria-label="Close detail view">
      <table
        className={`${s.table} ${theme === THEMES.LIGHT ? '' : s.darkTheme}`}
      >
        <thead onClick={handleClickPanel}>
          <tr>
            <th className={s.checkbox}></th>
            <th className={s.name}>Name</th>
            <th>Terrain</th>
          </tr>
        </thead>
        <tbody>
          {data?.results?.map((el) => <Card key={el.url} item={el} />)}
        </tbody>
      </table>
      <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={data?.count || 0} />
    </div>
  );
};
