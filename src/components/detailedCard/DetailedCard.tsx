import { Button } from '../button/Button';
import s from './style.module.css';
import { PlanetItem } from '../../common/types';
import { useRouter } from 'next/router';

type DetailedCardProps = {
  planet: PlanetItem;
  error: string | null;
};

export const DetailedCard = ({ planet, error }: DetailedCardProps) => {
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

  return (
    <div
      className={s.details}
      role="dialog"
      aria-labelledby="detailed-card-title"
    >
      <h3 id="detailed-card-title" className={s.title}>
        Planet Details
      </h3>
      {error && <div className={s.errorMessage}>{error}</div>}
      {!error && (
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
      )}
      <Button
        onClick={handleClickCloseDetails}
        aria-label="Close detailed view"
      >
        Close Details
      </Button>
    </div>
  );
};
