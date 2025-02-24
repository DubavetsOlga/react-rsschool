import { FC, useContext } from 'react';
import { Button } from '../button/Button';
import { Spinner } from '../spinner/Spinner';
import s from './style.module.css';
import { THEMES } from '../../context/constants';
import { ThemeContext } from '../../context/ThemeContext';
import { PlanetItem } from '../../api/planetsApi.types';
import { useRouter } from 'next/router';

type DetailedCardProps = {
  planet: PlanetItem | null;
  error: string | null;
};

const DetailedCard: FC<DetailedCardProps> = ({ planet, error }) => {
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : THEMES.LIGHT;
  const router = useRouter();

  const handleClickCloseDetails = () => {
    const newSearchParams = new URLSearchParams(
      router.query as Record<string, string>
    );
    newSearchParams.delete('detail');
    router.replace({
      pathname: '/',
      query: newSearchParams.toString(),
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!planet) {
    return <Spinner />;
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
        <p>Name: {planet.name}</p>
        <p>Rotation Period: {planet.rotation_period}</p>
        <p>Orbital Period: {planet.orbital_period}</p>
        <p>Diameter: {planet.diameter}</p>
        <p>Climate: {planet.climate}</p>
        <p>Gravity: {planet.gravity}</p>
        <p>Terrain: {planet.terrain}</p>
        <p>Surface Water: {planet.surface_water}</p>
        <p>Population: {planet.population}</p>
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
