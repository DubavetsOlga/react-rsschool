import { PlanetItem } from '../../store/planetsApi.types';

export const createCSV = (selectedPlanets: { [key: string]: PlanetItem }) => {
  const rows = [];
  for (const key in selectedPlanets) {
    rows.push([
      selectedPlanets[key].name,
      selectedPlanets[key].rotation_period,
      selectedPlanets[key].diameter,
      selectedPlanets[key].climate,
      selectedPlanets[key].gravity,
      selectedPlanets[key].population,
    ]);
  }

  return [
    ['Name', 'Rotation Period', 'Diameter', 'Climate', 'Gravity', 'Population'],
    ...rows,
  ]
    .map((row) => row.join(';'))
    .join('\n');
};
