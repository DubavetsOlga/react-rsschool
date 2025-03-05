import { PlanetItem } from '../types';

export const generateCSVContent = (
  selectedPlanets: Record<string, PlanetItem>
) => {
  const rows = Object.values(selectedPlanets).map((planet) => [
    planet.name,
    planet.rotation_period,
    planet.diameter,
    planet.climate,
    planet.gravity,
    planet.population,
  ]);

  const header = [
    'Name',
    'Rotation Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Population',
  ];

  return [header, ...rows].map((row) => row.join(';')).join('\n');
};

export const triggerDownload = (csvContent: string) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
};
