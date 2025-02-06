import { useEffect, useState } from 'react';
import { CardItem } from '../components/card/Card.tsx';

type ResponseType = {
  count: number;
  results: CardItem[];
};

export const useFetchPlanets = <T = ResponseType>({
  searchValue,
  currentPage,
  detail = '',
}: {
  searchValue: string;
  currentPage: string;
  detail?: string;
}) => {
  const [result, setResult] = useState<T>({} as T);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = detail
          ? `https://swapi.dev/api/planets/${detail}`
          : `https://swapi.dev/api/planets/?search=${searchValue.trim()}&page=${currentPage}`;

        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: T = await response.json();
        setResult(data);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [searchValue, currentPage, detail]);

  return { result, loading, error };
};
