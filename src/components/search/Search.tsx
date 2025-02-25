import { ReactElement, useEffect, useRef, useCallback } from 'react';
import { Input } from '../input/Input';
import { Button } from '../button/Button';
import s from './style.module.css';
import { useRouter } from 'next/router';
import { useAppDispatch, useInitializeSearchParams } from '../../common/hooks';
import { removeAllPlanetsFromSelected } from '../../common/store/planetSlice';

export const Search = ({
  initialSearch,
}: {
  initialSearch?: string;
}): ReactElement => {
  const initializeSearchParams = useInitializeSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeSearchParams();
  }, [initializeSearchParams]);

  const handleClickSearch = useCallback((): void => {
    const inputValue = inputRef.current?.value || '';
    localStorage.setItem('searchValue', inputValue);

    const newQuery = { ...router.query };
    if (inputValue) {
      newQuery.search = inputValue;
    } else {
      delete newQuery.search;
    }
    delete newQuery.page;

    router.replace({
      pathname: '/',
      query: newQuery,
    });

    dispatch(removeAllPlanetsFromSelected());
  }, [router, dispatch]);

  return (
    <div className={s.search}>
      <Input
        ref={inputRef}
        defaultValue={initialSearch || router.query.search || ''}
        placeholder="Enter search term"
        aria-label="Search input"
      />
      <Button onClick={handleClickSearch} aria-label="Search button">
        Search
      </Button>
    </div>
  );
};
