'use client';

import { ReactElement, useCallback, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '../pagination/Pagination';
import { Card } from '../card/Card';
import { THEMES } from '../../common/context/constants';
import { ThemeContext } from '../../common/context/ThemeContext';
import s from './style.module.css';
import { PlanetItem, ResponseType } from '../../common/types';

const ITEMS_PER_PAGE = 10;

export const CardList = ({ results, count }: ResponseType): ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = useContext(ThemeContext);
  const { theme = THEMES.LIGHT } = context || {};

  const handleClickPanel = useCallback(() => {
    if (!searchParams.has('detail')) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('detail');

    router.push(`/?${newSearchParams.toString()}`);
  }, [router, searchParams]);

  if (!results?.length) return <p>No results found.</p>;

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
          {results.map((el: PlanetItem) => (
            <Card key={el.url} item={el} />
          ))}
        </tbody>
      </table>
      <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={count || 0} />
    </div>
  );
};
