// import { fireEvent, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { MemoryRouter, Route, Routes, useSearchParams } from 'react-router';
// import { Pagination } from '../components';
//
// jest.mock('react-router', () => ({
//   ...jest.requireActual('react-router'),
//   useSearchParams: jest.fn(),
// }));
//
// describe('Pagination', () => {
//   it('should render pagination buttons correctly based on totalItems and itemsPerPage', () => {
//     const setSearchParams = jest.fn();
//     (useSearchParams as jest.Mock).mockReturnValue([
//       new URLSearchParams({ page: '1' }),
//       setSearchParams,
//     ]);
//
//     const totalItems = 50;
//     const itemsPerPage = 10;
//
//     render(<Pagination itemsPerPage={itemsPerPage} totalItems={totalItems} />);
//
//     const pageButtons = screen.getAllByRole('button', { name: /go to page/i });
//     expect(pageButtons).toHaveLength(5);
//   });
//
//   it('should not render pagination if there is only 1 page', () => {
//     const setSearchParams = jest.fn();
//     (useSearchParams as jest.Mock).mockReturnValue([
//       new URLSearchParams({ page: '1' }),
//       setSearchParams,
//     ]);
//
//     render(<Pagination itemsPerPage={10} totalItems={5} />);
//
//     const pageButtons = screen.queryAllByRole('button', {
//       name: /go to page/i,
//     });
//     expect(pageButtons).toHaveLength(0);
//   });
//
//   it('should handle page click correctly', () => {
//     const setSearchParams = jest.fn();
//
//     (useSearchParams as jest.Mock).mockImplementation(() => [
//       new URLSearchParams('page=1'),
//       setSearchParams,
//     ]);
//
//     render(
//       <MemoryRouter initialEntries={['/?page=1']}>
//         <Routes>
//           <Route
//             path="/"
//             element={<Pagination itemsPerPage={10} totalItems={50} />}
//           />
//         </Routes>
//       </MemoryRouter>
//     );
//
//     const page2Button = screen.getByText('2');
//     fireEvent.click(page2Button);
//
//     expect(setSearchParams).toHaveBeenCalledWith(new URLSearchParams('page=2'));
//   });
// });
