'use client';

import { ReactElement, useEffect, useRef, useCallback } from 'react';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import s from './style.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useInitializeSearchParams } from '../../common/hooks';
import { removeAllPlanetsFromSelected } from '../../common/store/planetSlice';

export const Search = ({
  initialSearch,
}: {
  initialSearch?: string;
}): ReactElement => {
  const initializeSearchParams = useInitializeSearchParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeSearchParams();
  }, []);

  const handleClickSearch = useCallback((): void => {
    const inputValue = inputRef.current?.value || '';
    localStorage.setItem('searchValue', inputValue);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (inputValue) {
      newSearchParams.set('search', inputValue);
    } else {
      newSearchParams.delete('search');
    }
    newSearchParams.delete('page');

    router.push(`/?${newSearchParams.toString()}`);

    dispatch(removeAllPlanetsFromSelected());
  }, [router, dispatch, searchParams]);

  return (
    <div className={s.search}>
      <Input
        ref={inputRef}
        defaultValue={initialSearch || searchParams.get('search') || ''}
        placeholder="Enter search term"
        aria-label="Search input"
      />
      <Button onClick={handleClickSearch} aria-label="Search button">
        Search
      </Button>
    </div>
  );
};
