import { Outlet } from 'react-router';
import { Search, CardList, SelectedItems } from '../../common/components';
import s from './style.module.css';
import { Route } from '../../../.react-router/types/src/+types/root';
import Spinner from '../../common/components/spinner/Spinner';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const searchValue = url.searchParams.get('search') ?? '';
  const currentPage = url.searchParams.get('page') ?? '1';

  const res = await fetch(
    `https://swapi.dev/api/planets/?search=${encodeURIComponent(searchValue.trim())}&page=${currentPage}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch planets');
  }

  return await res.json();
}

export const Main = ({ loaderData }: Route.ComponentProps) => {
  if (!loaderData) {
    return <Spinner />;
  }

  const { results, count } = loaderData;

  return (
    <div className={s.layout}>
      <Search />
      <div className={s.container}>
        <CardList results={results} count={count} />
        <Outlet />
      </div>
      <SelectedItems />
    </div>
  );
};

export default Main;
