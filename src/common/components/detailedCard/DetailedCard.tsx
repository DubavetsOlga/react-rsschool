import { useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Button } from '../index';
import s from './style.module.css';
import { THEMES } from '../context/constants';
import { ThemeContext } from '../context/ThemeContext.tsx';
import { Route } from '../../../../.react-router/types/src/+types/root';
import { PlanetItem } from '../../../store/planetsApi.types';
import Spinner from '../spinner/Spinner';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const planetId = url.searchParams.get('detail') ?? '';

  const res = await fetch(`https://swapi.dev/api/planets/${planetId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch planets');
  }

  return await res.json();
}

export const DetailedCard = ({ loaderData }: Route.ComponentProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const detailId = searchParams.get('detail');
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : THEMES.LIGHT;

  if (!loaderData) return <Spinner />;

  const data: PlanetItem = loaderData;

  const handleClickCloseDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('detail');

    navigate({
      pathname: '/',
      search: newSearchParams.toString(),
    });
  };

  if (!detailId) {
    handleClickCloseDetails();
  }

  return (
    <div
      className={`${s.details} ${theme === THEMES.LIGHT ? '' : s.darkTheme}`}
      role="dialog"
      aria-labelledby="detailed-card-title"
    >
      <h3 id="detailed-card-title" className={s.title}>
        Planet Details
      </h3>
      <div>
        <p>Name: {data.name}</p>
        <p>Rotation Period: {data.rotation_period}</p>
        <p>Orbital Period: {data.orbital_period}</p>
        <p>Diameter: {data.diameter}</p>
        <p>Climate: {data.climate}</p>
        <p>Gravity: {data.gravity}</p>
        <p>Terrain: {data.terrain}</p>
        <p>Surface Water: {data.surface_water}</p>
        <p>Population: {data.population}</p>
      </div>
      <Button
        onClick={handleClickCloseDetails}
        aria-label="Close detailed view"
      >
        Close Details
      </Button>
    </div>
  );
};

export default DetailedCard;
