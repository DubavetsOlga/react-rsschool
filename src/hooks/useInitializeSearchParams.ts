import { useSearchParams } from 'react-router';

export const useInitializeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return () => {
    try {
      const savedSearchValue = localStorage.getItem('searchValue');
      if (savedSearchValue && !searchParams.get('search')) {
        setSearchParams({ search: savedSearchValue });
      }
    } catch (error) {
      console.error('Failed to access localStorage:', error);
    }
  };
};
