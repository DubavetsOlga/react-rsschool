import s from './style.module.css';

type Props = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

export const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber: number) => {
    paginate(pageNumber);
  };

  return (
    <nav>
      <ul className={s.pagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${s.page_item} ${currentPage === number ? s.active : ''}`}
          >
            <button onClick={() => handleClick(number)} className={s.page_link}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
