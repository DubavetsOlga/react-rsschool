import { useInitializeSearchParams } from './hooks/useInitializeSearchParams';
import { Routing } from './components/Routing';
import { useEffect } from 'react';

const App = () => {
  const initializeSearchParams = useInitializeSearchParams();

  useEffect(() => {
    initializeSearchParams();
  }, [initializeSearchParams]);

  return <Routing />;
};

export default App;
