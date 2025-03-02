import { useContext } from 'react';
import { useSearchParams, useNavigate, redirect } from 'react-router';
import { Button } from '../index';
import { THEMES } from '../context/constants';
import { ThemeContext } from '../context/ThemeContext';
import { PlanetItem } from '../../../store/planetsApi.types';
import s from './style.module.css';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const planetId = url.searchParams.get('detail') ?? '';
  const res = await fetch(`https://swapi.dev/api/planets/${planetId}`);

  if (!res.ok || planetId === '') {
    const newUrl = new URL('/', url.origin);
    url.searchParams.forEach((value, key) => {
      if (key !== 'detail') {
        newUrl.searchParams.set(key, value);
      }
    });

    return redirect(newUrl.toString());
  }

  return await res.json();
}

const DetailedCard = ({ loaderData }: { loaderData: PlanetItem }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : THEMES.LIGHT;

  const handleClickCloseDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('detail');
    navigate({
      pathname: '/',
      search: newSearchParams.toString(),
    });
  };

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
        <p>Name: {loaderData.name}</p>
        <p>Rotation Period: {loaderData.rotation_period}</p>
        <p>Orbital Period: {loaderData.orbital_period}</p>
        <p>Diameter: {loaderData.diameter}</p>
        <p>Climate: {loaderData.climate}</p>
        <p>Gravity: {loaderData.gravity}</p>
        <p>Terrain: {loaderData.terrain}</p>
        <p>Surface Water: {loaderData.surface_water}</p>
        <p>Population: {loaderData.population}</p>
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
