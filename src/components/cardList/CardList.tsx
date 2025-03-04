import { ReactElement } from 'react';
import { Pagination } from '../pagination/Pagination';
import { Card } from '../card/Card';
import s from './style.module.css';
import { PlanetItem, ResponseType } from '../../common/types';

const ITEMS_PER_PAGE = 10;

export const CardList = ({ results, count }: ResponseType): ReactElement => {
  if (!results?.length) return <p>No results found.</p>;

  return (
    <div role="button" tabIndex={0} aria-label="Close detail view">
      <table className={s.table}>
        <thead>
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
      <Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={count} />
    </div>
  );
};
