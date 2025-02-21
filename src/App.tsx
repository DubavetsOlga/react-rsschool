import { Routing } from './components/Routing';
import { Theme } from './context/Theme';
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
