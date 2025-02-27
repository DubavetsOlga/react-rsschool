'use client';

import { Button } from '../button/Button';
import s from './style.module.css';
import { useContext, useRef, useState } from 'react';
import { removeAllPlanetsFromSelected } from '../../common/store/planetSlice';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { THEMES } from '../../common/context/constants';
import { ThemeContext } from '../../common/context/ThemeContext';
import { generateCSVContent, triggerDownload } from '../../common/utils';

export const SelectedItems = () => {
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : THEMES.LIGHT;
  const [downloadUrl, setDownloadUrl] = useState('');
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const dispatch = useAppDispatch();

  const selectedPlanets = useAppSelector(
    (state) => state.planet.selectedPlanets
  );
  const selectedCount = Object.keys(selectedPlanets).length;

  const handleClickDeleteSelected = () => {
    dispatch(removeAllPlanetsFromSelected());
  };

  const handleClickCreateCSV = () => {
    const csvContent = generateCSVContent(selectedPlanets);
    const url = triggerDownload(csvContent);

    setDownloadUrl(url);
    setTimeout(() => {
      if (downloadRef.current) {
        downloadRef.current.click();
        URL.revokeObjectURL(url);
        setDownloadUrl('');
      }
    }, 0);
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
      <a
        ref={downloadRef}
        href={downloadUrl}
        download={`${selectedCount}_planets.csv`}
        className={s.invisible}
      >
        Download link
      </a>
    </div>
  );
};
