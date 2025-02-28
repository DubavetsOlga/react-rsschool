import {
  type RouteConfig,
  route,
  layout,
  index,
} from '@react-router/dev/routes';

export default [
  layout('./components/layout/Layout.tsx', [
    index('./components/layout/home.tsx'),
    route('detailed', './components/detailedCard/DetailedCard.tsx'),
  ]),
  route('*?', './components/page404/Page404.tsx'),
] satisfies RouteConfig;
