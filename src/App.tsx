import { Component } from 'react';
import { CardList } from './components/cardList/CardList';
import { Search } from './components/search/Search';
import { ErrorButton } from './components/errorButton/ErrorButton';

class App extends Component {
  state: { searchValue: string } = {
    searchValue: localStorage.getItem('searchValue') ?? '',
  };

  handleSearchChange = (value: string): void => {
    localStorage.setItem('searchValue', value);
    this.setState({ searchValue: value });
  };

  render() {
    return (
      <div>
        <Search
          handleClickSearch={this.handleSearchChange}
          defaultSearchValue={this.state.searchValue}
        />
        <CardList searchValue={this.state.searchValue} />
        <ErrorButton />
      </div>
    );
  }
}

export default App;
