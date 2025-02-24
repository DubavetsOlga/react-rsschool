// import { DetailedCard } from '../components';
// import { fireEvent, render, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { useGetPlanetByIdQuery } from '../api/planets/planetsApi';
// import { planetReducer, planetSlice } from '../api/planets/planetSlice';
// import { useNavigate, useSearchParams } from 'react-router';
// import '@testing-library/jest-dom';
//
// jest.mock('react-router', () => ({
//   ...jest.requireActual('react-router'),
//   useNavigate: jest.fn(),
//   useSearchParams: jest.fn(),
// }));
// jest.mock('../api/planets/planetsApi', () => ({
//   useGetPlanetByIdQuery: jest.fn(),
// }));
//
// const store = configureStore({
//   reducer: {
//     [planetSlice.name]: planetReducer,
//   },
// });
//
// describe('DetailedCard Component', () => {
//   const mockUseGetPlanetByIdQuery = useGetPlanetByIdQuery as jest.Mock;
//   const mockNavigate = useNavigate as jest.Mock;
//   const mockUseSearchParams = useSearchParams as jest.Mock;
//
//   beforeEach(() => {
//     jest.clearAllMocks();
//     mockNavigate.mockImplementation(() => jest.fn());
//     mockUseSearchParams.mockReturnValue([new URLSearchParams(''), jest.fn()]);
//   });
//
//   afterEach(() => {
//     jest.restoreAllMocks();
//   });
//
//   it('renders a loading spinner when data is loading', () => {
//     mockUseGetPlanetByIdQuery.mockReturnValue({
//       data: undefined,
//       isLoading: true,
//       error: undefined,
//     });
//
//     const { container } = render(
//       <Provider store={store}>
//         <DetailedCard />
//       </Provider>
//     );
//
//     const loaderElement = container.querySelector('.loader');
//     expect(loaderElement).toBeInTheDocument();
//     expect(loaderElement).toHaveClass('loader');
//   });
//
//   it('renders planet details when data is loaded', async () => {
//     const mockData = {
//       name: 'Earth',
//       rotation_period: '24 hours',
//       orbital_period: '365 days',
//       diameter: '12742 km',
//       climate: 'Temperate',
//       gravity: '9.8 m/s²',
//       terrain: 'Mountain, Desert',
//       surface_water: '70%',
//       population: '7 billion',
//     };
//
//     mockUseGetPlanetByIdQuery.mockReturnValue({
//       data: mockData,
//       isLoading: false,
//       error: undefined,
//     });
//
//     render(
//       <Provider store={store}>
//         <DetailedCard />
//       </Provider>
//     );
//
//     expect(await screen.findByText('Name: Earth')).toBeInTheDocument();
//     expect(screen.getByText('Rotation Period: 24 hours')).toBeInTheDocument();
//     expect(screen.getByText('Orbital Period: 365 days')).toBeInTheDocument();
//     expect(screen.getByText('Diameter: 12742 km')).toBeInTheDocument();
//     expect(screen.getByText('Climate: Temperate')).toBeInTheDocument();
//     expect(screen.getByText('Gravity: 9.8 m/s²')).toBeInTheDocument();
//     expect(screen.getByText('Terrain: Mountain, Desert')).toBeInTheDocument();
//     expect(screen.getByText('Surface Water: 70%')).toBeInTheDocument();
//     expect(screen.getByText('Population: 7 billion')).toBeInTheDocument();
//   });
//
//   it('displays error message if there is an error', () => {
//     mockUseGetPlanetByIdQuery.mockReturnValue({
//       data: undefined,
//       isLoading: false,
//       error: { details: 'Not found' },
//     });
//
//     render(
//       <Provider store={store}>
//         <DetailedCard />
//       </Provider>
//     );
//
//     expect(screen.getByText('Not found')).toBeInTheDocument();
//   });
//
//   it('calls navigate to close details when the close button is clicked', async () => {
//     const mockData = {
//       name: 'Earth',
//       rotation_period: '24 hours',
//       orbital_period: '365 days',
//       diameter: '12742 km',
//       climate: 'Temperate',
//       gravity: '9.8 m/s²',
//       terrain: 'Mountain, Desert',
//       surface_water: '70%',
//       population: '7 billion',
//     };
//
//     mockUseGetPlanetByIdQuery.mockReturnValue({
//       data: mockData,
//       isLoading: false,
//       error: undefined,
//     });
//
//     const navigateMock = jest.fn();
//     mockNavigate.mockImplementation(() => navigateMock);
//
//     render(
//       <Provider store={store}>
//         <DetailedCard />
//       </Provider>
//     );
//
//     const closeButton = screen.getByText('Close Details');
//     fireEvent.click(closeButton);
//
//     expect(navigateMock).toHaveBeenCalledWith({
//       pathname: '/',
//       search: '',
//     });
//   });
// });
