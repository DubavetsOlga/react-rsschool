import { Search } from './components/search/Search';
import { ErrorButton } from './components/errorButton/ErrorButton';
import { Results } from './components/results/Results.tsx';

const App = () => {
  return (
    <div>
      <Search />
      <Results />
      <ErrorButton />
    </div>
  );
};

export default App;
