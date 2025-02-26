'use client';

import { useContext } from 'react';
import { Button } from '../button/Button';
import { Spinner } from '../spinner/Spinner';
import s from './style.module.css';
import { THEMES } from '../../common/context/constants';
import { ThemeContext } from '../../common/context/ThemeContext';
import { PlanetItem } from '../../common/types';
import { useRouter, useSearchParams } from 'next/navigation';

type DetailedCardProps = {
  planet: PlanetItem | null;
  error: string | null;
};

export const DetailedCard = ({ planet, error }: DetailedCardProps) => {
  const { theme = THEMES.LIGHT } = useContext(ThemeContext) || {};
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClickCloseDetails = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('detail');

    router.push(`/?${newSearchParams.toString()}`);
  };

  if (error) {
    return (
      <div
        className={`${s.details} ${theme === THEMES.LIGHT ? '' : s.darkTheme}`}
        role="dialog"
        aria-labelledby="detailed-card-title"
        aria-live="assertive"
      >
        <h3 id="detailed-card-title" className={s.title}>
          Planet Details
        </h3>
        <div className={s.errorMessage}>{error}</div>
        <Button
          onClick={handleClickCloseDetails}
          aria-label="Close detailed view"
        >
          Close Details
        </Button>
      </div>
    );
  }

  if (!planet) {
    return (
      <div
        className={`${s.details} ${theme === THEMES.LIGHT ? '' : s.darkTheme}`}
        role="dialog"
        aria-labelledby="detailed-card-title"
      >
        <h3 id="detailed-card-title" className={s.title}>
          Planet Details
        </h3>
        <Spinner />
        <Button
          onClick={handleClickCloseDetails}
          aria-label="Close detailed view"
        >
          Close Details
        </Button>
      </div>
    );
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
