import { useState } from 'react';
import { CardList } from './components/cardList/CardList';
import { Search } from './components/search/Search';
import { ErrorButton } from './components/errorButton/ErrorButton';

const App = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') ?? ''
  );

  const handleSearchChange = (value: string): void => {
    localStorage.setItem('searchValue', value);
    setSearchValue(value);
  };

  return (
    <div>
      <Search
        onClickSearch={handleSearchChange}
        defaultSearchValue={searchValue}
      />
      <CardList searchValue={searchValue} />
      <ErrorButton />
    </div>
  );
};

export default App;
