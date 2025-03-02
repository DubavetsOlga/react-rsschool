import { PlanetItem } from '../types';

/**
 * Generate CSV content from selected planets.
 * @param selectedPlanets The object containing selected planets.
 * @returns CSV string content.
 */
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

/**
 * Trigger the CSV download by creating a Blob URL.
 * @param csvContent The CSV string content.
 * @returns The Blob URL.
 */
export const triggerDownload = (csvContent: string) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  return url;
};
