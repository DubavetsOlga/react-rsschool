import { Route, Routes } from 'react-router';
import { Page404 } from './page404/Page404.tsx';
import App from '../App.tsx';

export const Path = {
  Main: '/',
  NotFound: '*',
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<App />} />
      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  );
};
