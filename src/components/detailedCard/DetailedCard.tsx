import { useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Button } from '../button/Button';
import { useFetchPlanets } from '../../hooks/useFetchPlanets';
import { Spinner } from '../spinner/Spinner';
import { CardItem } from '../card/Card';
import s from './style.module.css';
import { Path } from '../Routing';

export const DetailedCard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const detailId = searchParams.get('detail');

  const { result, loading, error } = useFetchPlanets<CardItem>({
    currentPage: '',
    searchValue: '',
    detail: detailId ?? '',
  });

  const handleClickCloseDetails = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('detail');

    navigate({
      pathname: Path.Main,
      search: newSearchParams.toString(),
    });
  }, [navigate, searchParams]);

  useEffect(() => {
    if (!detailId) {
      handleClickCloseDetails();
    }
  }, [detailId, handleClickCloseDetails]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className={s.details}
      role="dialog"
      aria-labelledby="detailed-card-title"
    >
      <h3 id="detailed-card-title" className={s.title}>
        Planet Details
      </h3>
      {loading && <Spinner />}
      {!loading && result && (
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
      <Button
        onClick={handleClickCloseDetails}
        aria-label="Close detailed view"
      >
        Close Details
      </Button>
    </div>
  );
};
