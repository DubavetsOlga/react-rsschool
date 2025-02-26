'use client';

import { ReactElement, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import s from './style.module.css';

interface Props {
  itemsPerPage: number;
  totalItems: number;
}

export const Pagination = ({
  itemsPerPage,
  totalItems,
}: Props): ReactElement => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get('page') ?? '1';

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const handleClick = (pageNumber: number): void => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', pageNumber.toString());

    newSearchParams.delete('detail');

    router.push(`/?${newSearchParams.toString()}`);
  };

  if (totalPages <= 1) return <></>;

  return (
    <nav aria-label="Pagination">
      <ul className={s.pagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${s.page_item} ${+currentPage === number ? s.active : ''}`}
            aria-current={+currentPage === number ? 'page' : undefined}
          >
            <button
              onClick={() => handleClick(number)}
              className={s.page_link}
              aria-label={`Go to page ${number}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
