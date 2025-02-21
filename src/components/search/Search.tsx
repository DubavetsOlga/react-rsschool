import { ReactElement, useEffect, useRef, useCallback } from 'react';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import s from './style.module.css';
import { useSearchParams } from 'react-router';
import { useInitializeSearchParams } from '../../hooks/useInitializeSearchParams';
import { removeAllPlanetsFromSelected } from '../../api/planets/planetSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const Search = (): ReactElement => {
  const initializeSearchParams = useInitializeSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeSearchParams();
  }, [initializeSearchParams]);

  const handleClickSearch = useCallback((): void => {
    const inputValue = inputRef.current?.value || '';
    localStorage.setItem('searchValue', inputValue);

    setSearchParams(inputValue ? { search: inputValue } : {});

    dispatch(removeAllPlanetsFromSelected());
  }, [setSearchParams, dispatch]);

  return (
    <div className={s.search}>
      <Input
        ref={inputRef}
        defaultValue={searchParams.get('search') || ''}
        placeholder="Enter search term"
        aria-label="Search input"
      />
      <Button onClick={handleClickSearch} aria-label="Search button">
        Search
      </Button>
    </div>
  );
};
