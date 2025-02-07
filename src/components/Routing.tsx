import { Route, Routes } from 'react-router';
import { DetailedCard } from './detailedCard/DetailedCard';
import { Page404 } from './page404/Page404';
import Layout from './layout/Layout';

export const Path = {
  Main: '/',
  MainDetailed: 'detailed',
  NotFound: '*',
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Layout />}>
        <Route index element={<></>} />
        <Route path="detailed" element={<DetailedCard />} />
      </Route>
      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  );
};
