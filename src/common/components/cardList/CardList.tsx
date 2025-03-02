import { ReactElement, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Pagination } from '../pagination/Pagination';
import { Card } from '../card/Card';
import { THEMES } from '../context/constants';
import { ThemeContext } from '../context/ThemeContext';
import s from './style.module.css';
import { ResponseType } from '../../../store/planetsApi.types';

const ITEMS_PER_PAGE = 10;

export const CardList = ({ results, count }: ResponseType): ReactElement => {
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : THEMES.LIGHT;
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const handleClickPanel = () => {
    if (!searchParams.get('detail')) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('detail');

    navigate({
      pathname: '/',
      search: newSearchParams.toString(),
    });
  };

  if (results?.length === 0) return <p>No results found.</p>;

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
        <tbody>{results?.map((el) => <Card key={el.url} item={el} />)}</tbody>
      </table>
      <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={count || 0} />
    </div>
  );
};
