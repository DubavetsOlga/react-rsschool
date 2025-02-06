import { Button } from '../button/Button.tsx';
import { useFetchPlanets } from '../../hooks/useFetchPlanets.ts';
import { Spinner } from '../spinner/Spinner.tsx';
import { CardItem } from '../card/Card.tsx';
import { useSearchParams } from 'react-router';
import s from './style.module.css';

export const DetailedCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailId = searchParams.get('detail');

  const { result, loading, error } = useFetchPlanets<CardItem>({
    currentPage: '',
    searchValue: '',
    detail: detailId ?? '',
  });

  if (!detailId) {
    return null;
  }

  const handleClickCloseDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('detail');
    setSearchParams(newSearchParams);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className={s.details}>
      <h3 className={s.title}>Planet Details</h3>
      {loading && <Spinner />}
      {!loading && (
        <div>
          <p>Name: {result.name}</p>
          <p>Rotation Period: {result.rotation_period}</p>
          <p>Orbital Period: {result.orbital_period}</p>
          <p>Diameter: {result.diameter}</p>
          <p>Climate: {result.climate}</p>
          <p>Gravity: {result.gravity}</p>
          <p>Terrain: {result.terrain}</p>
          <p>Surface Water: {result.surface_water}</p>
          <p>Population: {result.population}</p>
        </div>
      )}
      <Button onClick={handleClickCloseDetails}>Close Details</Button>
    </div>
  );
};
