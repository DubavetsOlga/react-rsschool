import { Routing } from './components/Routing';
import { Theme } from './context/Theme.tsx';
import { Header } from './components/header/Header';

const App = () => {
  return (
    <Theme>
      <Header />
      <Routing />
    </Theme>
  );
};

export default App;
