import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailedPage, { getServerSideProps } from '../app/detailed/page.tsx';
import { ResponseType, PlanetItem } from '../common/types';
import { GetServerSidePropsContext } from 'next';
import { getServerSidePropsDetailed } from '../common/utils';
import { Theme } from '../common/context/Theme';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../common/utils', () => ({
  getServerSidePropsDetailed: jest.fn(),
}));

describe('DetailedPage', () => {
  const mockPlanet: PlanetItem = {
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

  const selectedPlanets = {
    Tatooine: mockPlanet,
  };

  const store = configureStore({
    reducer: {
      planet: () => ({ selectedPlanets }),
    },
  });

  const mockPlanetsData: ResponseType = {
    results: [],
    count: 0,
  };

  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    mockSetSearchParams.mockClear();
    localStorage.clear();
    (useRouter as jest.Mock).mockReturnValue({
      query: { search: 'initial search' },
      push: mockSetSearchParams,
      replace: mockSetSearchParams,
      pathname: '/',
    });
  });

  it('should render the page correctly with planet data', async () => {
    (getServerSidePropsDetailed as jest.Mock).mockResolvedValue({
      props: {
        planet: mockPlanet,
        error: null,
        planetsData: mockPlanetsData,
      },
    });

    render(
      <Theme>
        <Provider store={store}>
          <DetailedPage
            planet={mockPlanet}
            error={null}
            planetsData={mockPlanetsData}
          />
        </Provider>
      </Theme>
    );

    expect(await screen.findByText('Name: Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Climate: arid')).toBeInTheDocument();
  });

  it('should display error message if there is an error', async () => {
    const mockError = 'No planet found.';

    (getServerSidePropsDetailed as jest.Mock).mockResolvedValue({
      props: {
        planet: null,
        error: mockError,
        planetsData: mockPlanetsData,
      },
    });

    render(
      <Theme>
        <Provider store={store}>
          <DetailedPage
            planet={null}
            error={mockError}
            planetsData={mockPlanetsData}
          />
        </Provider>
      </Theme>
    );

    expect(screen.getByText(mockError)).toBeInTheDocument();
  });

  it('should call getServerSideProps and return the correct props', async () => {
    const context: GetServerSidePropsContext = {
      params: {},
      query: { detail: '1' },
      resolvedUrl: '/detailed?detail=1',
      req: {} as never,
      res: {} as never,
      preview: false,
      previewData: '',
    };

    (getServerSidePropsDetailed as jest.Mock).mockResolvedValue({
      props: {
        planet: mockPlanet,
        error: null,
        planetsData: mockPlanetsData,
      },
    });

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        planet: mockPlanet,
        error: null,
        planetsData: mockPlanetsData,
      },
    });
  });
});
