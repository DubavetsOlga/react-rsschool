import { useCallback, useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Button } from '../button/Button';
import { Spinner } from '../spinner/Spinner';
import s from './style.module.css';
import { Path } from '../../app/Routing';
import { useGetPlanetByIdQuery } from '../../api/planets/planetsApi';
import { THEMES } from '../context/constants';
import { ThemeContext } from '../context/ThemeContext';

export const DetailedCard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const detailId = searchParams.get('detail');
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : THEMES.LIGHT;

  const { data, isLoading, error } = useGetPlanetByIdQuery({
    planetId: detailId || '',
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

  return (
    <div
      className={`${s.details} ${theme === THEMES.LIGHT ? '' : s.darkTheme}`}
      role="dialog"
      aria-labelledby="detailed-card-title"
    >
      <h3 id="detailed-card-title" className={s.title}>
        Planet Details
      </h3>
      {error && <div>Not found</div>}
      {isLoading && <Spinner />}
      {!isLoading && data && (
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

export default DetailedCard;
