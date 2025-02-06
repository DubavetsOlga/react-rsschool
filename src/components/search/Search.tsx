import { ReactElement, useRef } from 'react';
import { Input } from '../input/Input.tsx';
import { Button } from '../button/Button.tsx';
import s from './style.module.css';
import { useSearchParams } from 'react-router';

export const Search = (): ReactElement => {
  //  useInitializeSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickSearch = (): void => {
    const inputValue = inputRef.current?.value || '';
    localStorage.setItem('searchValue', inputValue);

    if (inputValue === '') {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('search');
      setSearchParams(newSearchParams);
    } else {
      setSearchParams({ search: inputValue });
    }
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
