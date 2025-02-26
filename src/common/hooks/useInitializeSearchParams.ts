'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export const useInitializeSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return () => {
    const savedSearchValue = localStorage.getItem('searchValue');

    if (savedSearchValue && !searchParams.get('search')) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('search', savedSearchValue);

      router.push(`${pathname}?${newSearchParams.toString()}`);
    }
  };
};
