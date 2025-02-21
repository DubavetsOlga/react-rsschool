import { Button } from '../button/Button';
import s from './style.module.css';
import { useContext } from 'react';
import { removeAllPlanetsFromSelected } from '../../api/planets/planetSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { saveAs } from 'file-saver';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { THEMES } from '../../app/context/constants';
import { ThemeContext } from '../../app/context/ThemeContext';

export const SelectedItems = () => {
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : THEMES.LIGHT;

  const dispatch = useAppDispatch();

  const selectedPlanets = useAppSelector(
    (state) => state.planet.selectedPlanets
  );
  const selectedCount = Object.keys(selectedPlanets).length;

  const handleClickDeleteSelected = () => {
    dispatch(removeAllPlanetsFromSelected());
  };

  const handleClickCreateCSV = () => {
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

    const csvContent = [
      [
        'Name',
        'Rotation Period',
        'Diameter',
        'Climate',
        'Gravity',
        'Population',
      ],
      ...rows,
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedCount}_planets.csv`);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div
      className={`${s.selected} ${theme === THEMES.LIGHT ? '' : s.darkTheme}`}
    >
      {selectedCount} planets are selected
      <Button onClick={handleClickDeleteSelected}>Unselect all</Button>
      <Button onClick={handleClickCreateCSV}>Download</Button>
    </div>
  );
};
