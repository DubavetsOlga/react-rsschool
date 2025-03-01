import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate, useSearchParams } from 'react-router';
import { Card } from '../components';
import '@testing-library/jest-dom';
import { PlanetItem } from '../store/planetsApi.types.ts';
import { configureStore } from '@reduxjs/toolkit';
import {
  addPlanetToSelected,
  planetReducer,
  planetSlice,
  removePlanetFromSelected,
} from '../store/planetSlice.ts';
import { Provider } from 'react-redux';
import { planetsApi } from '../store/planets/planetsApi';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock('../hooks/useAppSelector');
jest.mock('../hooks/useAppDispatch');

const mockNavigate = useNavigate as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

const store = configureStore({
  reducer: {
    [planetSlice.name]: planetReducer,
    [planetsApi.reducerPath]: planetsApi.reducer,
  },
});

describe('Card Component', () => {
  const mockPlanetItem: PlanetItem = {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: ['Luke Skywalker'],
    films: ['A New Hope'],
    created: '2023-02-06',
    edited: '2023-02-06',
    url: 'https://swapi.dev/api/planets/1/',
  };

  const mockDispatch = jest.fn();
  const mockUseAppSelector = useAppSelector as jest.Mock;
  const mockUseAppDispatch = useAppDispatch as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockReturnValue({});
    mockNavigate.mockReturnValue(jest.fn());
  });

  it('renders card data correctly', () => {
    const setSearchParamsMock = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams(''),
      setSearchParamsMock,
    ]);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <table>
            <tbody>
              <Card item={mockPlanetItem} />
            </tbody>
          </table>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('desert')).toBeInTheDocument();
  });

  it('calls navigate with the correct parameters when row is clicked', () => {
    const setSearchParamsMock = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams(''),
      setSearchParamsMock,
    ]);

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <table>
            <tbody>
              <Card item={mockPlanetItem} />
            </tbody>
          </table>
        </Provider>
      </BrowserRouter>
    );

    const rowElement = screen.getByText('Tatooine').closest('tr');
    if (rowElement) {
      fireEvent.click(rowElement);
    }

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/detailed',
      search: 'detail=1',
    });
  });

  test('should delete the "detail" search parameter if it matches the id', () => {
    const setSearchParamsMock = jest.fn();
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams('detail=1'),
      setSearchParamsMock,
    ]);

    render(
      <BrowserRouter>
        <Provider store={store}>
          <table>
            <tbody>
              <Card item={mockPlanetItem} />
            </tbody>
          </table>
        </Provider>
      </BrowserRouter>
    );

    const rowElement = screen.getByText('Tatooine').closest('tr');
    if (rowElement) {
      fireEvent.click(rowElement);
    }

    expect(setSearchParamsMock).toHaveBeenCalledWith(new URLSearchParams(''));
  });

  const renderCard = (selectedPlanets: Record<string, PlanetItem>) => {
    mockUseAppSelector.mockReturnValue(selectedPlanets);

    const store = configureStore({
      reducer: {
        planet: () => ({ selectedPlanets }),
      },
    });

    return render(
      <BrowserRouter>
        <Provider store={store}>
          <table>
            <tbody>
              <Card item={mockPlanetItem} />
            </tbody>
          </table>
        </Provider>
      </BrowserRouter>
    );
  };

  test('checkbox is checked if the planet is selected', () => {
    const selectedPlanets = {
      Tatooine: mockPlanetItem,
    };

    renderCard(selectedPlanets);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('checkbox is unchecked if the planet is not selected', () => {
    const selectedPlanets = {};

    renderCard(selectedPlanets);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('dispatches addPlanetToSelected when checkbox is checked', () => {
    const selectedPlanets = {};

    renderCard(selectedPlanets);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(
      addPlanetToSelected({ planet: mockPlanetItem })
    );
  });

  test('dispatches removePlanetFromSelected when checkbox is unchecked', () => {
    const selectedPlanets = {
      Tatooine: mockPlanetItem,
    };

    renderCard(selectedPlanets);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(
      removePlanetFromSelected({ name: mockPlanetItem.name })
    );
  });
});
