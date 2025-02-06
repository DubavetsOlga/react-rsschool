import s from './style.module.css';
import { useSearchParams } from 'react-router';
import { ReactElement } from 'react';

interface Props {
  itemsPerPage: number;
  totalItems: number;
}

export const Pagination = ({
  itemsPerPage,
  totalItems,
}: Props): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? '1';

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return <></>;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (pageNumber: number): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', pageNumber.toString());
    setSearchParams(newSearchParams);
  };

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
