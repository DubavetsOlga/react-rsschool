import { ReactElement, useEffect, useRef } from 'react';
import { Input, Button } from '../index';
import { useNavigate, useSearchParams } from 'react-router';
import { useInitializeSearchParams } from '../../hooks/useInitializeSearchParams';
import s from './style.module.css';

export const Search = (): ReactElement => {
  const initializeSearchParams = useInitializeSearchParams();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    initializeSearchParams();
  }, []);

  const handleClickSearch = (): void => {
    const inputValue = inputRef.current?.value || '';
    localStorage.setItem('searchValue', inputValue);

    navigate({
      pathname: '/',
      search: inputValue
        ? `?${new URLSearchParams({ search: inputValue }).toString()}`
        : '',
    });
  };

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
