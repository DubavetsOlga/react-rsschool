import {
  type RouteConfig,
  route,
  layout,
  index,
} from '@react-router/dev/routes';

export default [
  layout('./routes/main/Main.tsx', [
    index('./routes/main/home.tsx'),
    route('detailed', './common/components/detailedCard/DetailedCard.tsx'),
  ]),
  route('*?', './routes/page404/Page404.tsx'),
] satisfies RouteConfig;
