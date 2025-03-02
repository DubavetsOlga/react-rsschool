import { ReactElement, useMemo } from 'react';
import { useRouter } from 'next/router';
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
  const currentPage = router.query.page ?? '1';

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const handleClick = (pageNumber: number): void => {
    const newQuery: Record<string, string | string[] | undefined> = {
      ...router.query,
      page: pageNumber.toString(),
    };

    delete newQuery.detail;

    router.push({
      pathname: '/',
      query: newQuery,
    });
  };

  if (totalPages <= 1) return <></>;

  return (
    <nav aria-label="Pagination">
      <ul className={s.pagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${s.page_item} ${
              +currentPage === number ? s.active : ''
            }`}
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
