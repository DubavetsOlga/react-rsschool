import { ChangeEvent, ReactElement, useState } from 'react';
import { Input } from '../input/Input.tsx';
import { Button } from '../button/Button.tsx';
import s from './style.module.css';

interface Props {
  onClickSearch: (value: string) => void;
  defaultSearchValue?: string;
}

export const Search = ({
  onClickSearch,
  defaultSearchValue = '',
}: Props): ReactElement => {
  const [inputValue, setInputValue] = useState(defaultSearchValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleClickSearch = (): void => {
    onClickSearch(inputValue);
  };

  return (
    <div className={s.search}>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter search term"
        aria-label="Search input"
      />
      <Button onClick={handleClickSearch} aria-label="Search button">
        Search
      </Button>
    </div>
  );
};
