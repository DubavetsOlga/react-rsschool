import { ChangeEvent, ReactElement, MouseEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { getIdFromUrl } from '../../utils/getIdFromURL';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  removePlanetFromSelected,
  addPlanetToSelected,
} from '../../../store/planetSlice';
import { PlanetItem } from '../../../store/planetsApi.types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import s from './style.module.css';

export const Card = ({ item }: { item: PlanetItem }): ReactElement => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

    const newSearchParams = new URLSearchParams(searchParams);

    if (id === searchParams.get('detail')) {
      newSearchParams.delete('detail');
      navigate({
        pathname: '/',
        search: newSearchParams.toString(),
      });
      return;
    }

    newSearchParams.set('detail', id);
    navigate(
      {
        pathname: '/detailed',
        search: newSearchParams.toString(),
      },
      { replace: true }
    );
  };

  const handleClickCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.target.checked) {
      dispatch(addPlanetToSelected({ planet: item }));
    } else {
      dispatch(removePlanetFromSelected({ name: item.name }));
    }
  };

  return (
    <tr
      onClick={(e) => handleClickDetail(e)}
      role="button"
      aria-label={`View details of ${item.name}`}
      style={{ cursor: 'pointer' }}
    >
      <td>
        <input
          type="checkbox"
          className={s.checkbox}
          checked={Object.prototype.hasOwnProperty.call(
            selectedPlanets,
            item.name
          )}
          onChange={(e) => handleClickCheckbox(e)}
        />
      </td>
      <td className={s.name}>{item.name}</td>
      <td>{item.terrain}</td>
    </tr>
  );
};
