import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Card } from '../components';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  addPlanetToSelected,
  planetReducer,
  planetSlice,
  removePlanetFromSelected,
} from '../common/store/planetSlice';
import { PlanetItem } from '../common/types';
import { useAppDispatch, useAppSelector } from '../common/hooks';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('../common/hooks/useAppSelector');
jest.mock('../common/hooks/useAppDispatch');

const store = configureStore({
  reducer: {
    [planetSlice.name]: planetReducer,
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

  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockReturnValue({});
    (usePathname as jest.Mock).mockReturnValue('/');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: mockPush,
    });
  });

  it('renders card data correctly', () => {
    render(
      <Provider store={store}>
        <table>
          <tbody>
            <Card item={mockPlanetItem} />
          </tbody>
        </table>
      </Provider>
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('desert')).toBeInTheDocument();
  });

  it('calls navigate with the correct parameters when row is clicked', () => {
    render(
      <Provider store={store}>
        <table>
          <tbody>
            <Card item={mockPlanetItem} />
          </tbody>
        </table>
      </Provider>
    );

    const rowElement = screen.getByText('Tatooine').closest('tr');
    if (rowElement) {
      fireEvent.click(rowElement);
    }

    expect(mockPush).toHaveBeenCalledWith('/detailed?detail=1');
  });

  const renderCard = (selectedPlanets: Record<string, PlanetItem>) => {
    mockUseAppSelector.mockReturnValue(selectedPlanets);

    const store = configureStore({
      reducer: {
        planet: () => ({ selectedPlanets }),
      },
    });

    return render(
      <Provider store={store}>
        <table>
          <tbody>
            <Card item={mockPlanetItem} />
          </tbody>
        </table>
      </Provider>
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
