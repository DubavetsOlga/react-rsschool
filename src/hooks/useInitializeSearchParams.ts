'use client';

import { useRouter } from 'next/router';

export const useInitializeSearchParams = () => {
  const router = useRouter();

  return () => {
    const searchParams = new URLSearchParams(window.location.search);
    const savedSearchValue = localStorage.getItem('searchValue');

    if (savedSearchValue && !searchParams.get('search')) {
      searchParams.set('search', savedSearchValue);
      router.replace(`?${searchParams.toString()}`);
    }
  };
};
