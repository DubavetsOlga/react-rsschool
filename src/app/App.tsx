import { Routing } from './Routing';
import { Theme } from './context/Theme';
import { Header } from '../components';

const App = () => {
  return (
    <Theme>
      <Header />
      <Routing />
    </Theme>
  );
};

export default App;
