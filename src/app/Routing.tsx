import { Route, Routes } from 'react-router';
import { DetailedCard, Layout, Page404 } from '../components';

export const Path = {
  Main: '/',
  MainDetailed: 'detailed',
  NotFound: '*',
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Layout />}>
        <Route path={Path.MainDetailed} element={<DetailedCard />} />
      </Route>
      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  );
};
