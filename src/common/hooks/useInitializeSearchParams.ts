import { useSearchParams } from 'react-router';

export const useInitializeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return () => {
    const savedSearchValue = localStorage.getItem('searchValue');
    if (savedSearchValue && !searchParams.get('search')) {
      setSearchParams({ search: savedSearchValue });
    }
  };
};
