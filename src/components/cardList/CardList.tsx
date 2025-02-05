import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Card, CardItem } from '../card/Card';
import s from './style.module.css';
import { Spinner } from '../spinner/Spinner';
import { Pagination } from '../pagination/Pagination.tsx';

type ResponseType = {
  count: number;
  next: string;
  previous: string;
  results: CardItem[];
};

const RESULT_DEFAULT = {
  count: 0,
  next: '',
  previous: '',
  results: [],
};

const ITEMS_PER_PAGE = 10;

export const CardList = ({
  searchValue,
}: {
  searchValue: string;
}): ReactElement => {
  const [result, setResult] = useState<ResponseType>(RESULT_DEFAULT);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback((): void => {
    setLoading(true);
    setError(null);

    fetch(
      `https://swapi.dev/api/planets/?search=${searchValue.trim()}&page=${currentPage}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data: ResponseType) => {
        setResult(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [searchValue, currentPage]);

  useEffect(() => {
    fetchData();
  }, [searchValue, currentPage, fetchData]);

  const handleClickPaginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Spinner />;
  }
  if (result.results.length === 0) {
    return <p>No results found.</p>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Terrain</th>
          </tr>
        </thead>
        <tbody>
          {result.results.map((el) => (
            <Card key={el.url} item={el} />
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={result.count}
        paginate={handleClickPaginate}
        currentPage={currentPage}
      />
    </div>
  );
};
