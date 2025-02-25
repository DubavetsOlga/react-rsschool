import { ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { getIdFromUrl } from '../../common/utils';
import {
  removePlanetFromSelected,
  addPlanetToSelected,
} from '../../common/store/planetSlice';
import { PlanetItem } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import s from './style.module.css';

export const Card = ({ item }: { item: PlanetItem }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const selectedPlanets = useAppSelector(
    (state) => state.planet.selectedPlanets
  );

  const handleClickDetail = (e: MouseEvent<HTMLTableRowElement>) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') {
      return;
    }

    const id = getIdFromUrl(item.url);
    if (!id) {
      return;
    }

    const newSearchParams = new URLSearchParams(
      router.query as Record<string, string>
    );

    if (id === router.query?.detail) {
      newSearchParams.delete('detail');
      router.replace({ pathname: '/', query: newSearchParams.toString() });
    } else {
      newSearchParams.set('detail', id);
      router.push({ pathname: '/detailed', query: newSearchParams.toString() });
    }
  };

  const handleClickCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.target.checked) {
      dispatch(addPlanetToSelected({ planet: item }));
    } else {
      dispatch(removePlanetFromSelected({ name: item.name }));
    }
  };

  const isChecked = Object.prototype.hasOwnProperty.call(
    selectedPlanets,
    item.name
  );

  return (
    <tr
      onClick={handleClickDetail}
      role="button"
      aria-label={`View details of ${item.name}`}
      style={{ cursor: 'pointer' }}
    >
      <td>
        <input
          type="checkbox"
          className={s.checkbox}
          checked={isChecked}
          onChange={handleClickCheckbox}
        />
      </td>
      <td className={s.name}>{item.name}</td>
      <td>{item.terrain}</td>
    </tr>
  );
};
