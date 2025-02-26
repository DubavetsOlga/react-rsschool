import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/index';
import { ResponseType } from '../common/types';

jest.mock('../components/wrapper/Wrapper.tsx', () => ({
  Layout: jest.fn(({ planetsData }) => (
    <div>{planetsData ? 'Planets data available' : 'No data'}</div>
  )),
}));

describe('HomePage', () => {
  it('should render error message if error is provided', () => {
    const error = 'Something went wrong!';
    render(<HomePage error={error} planetsData={null} page="1" search="" />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('should render no data message if planetsData is null', () => {
    render(
      <HomePage error={undefined} planetsData={null} page="1" search="" />
    );
    expect(screen.getByText('No planets data available.')).toBeInTheDocument();
  });

  it('should render Wrapper component if planetsData is provided', () => {
    const mockPlanetsData: ResponseType = {
      count: 1,
      results: [
        {
          name: 'Earth',
          rotation_period: '24',
          orbital_period: '365',
          diameter: '12742',
          climate: 'temperate',
          gravity: '1',
          terrain: 'mountains, forests, oceans',
          surface_water: '71',
          population: '7 billion',
          residents: ['Luke Skywalker'],
          films: ['A New Hope'],
          created: '2023-02-06',
          edited: '2023-02-06',
          url: 'https://swapi.dev/api/planets/1/',
        },
      ],
    };

    render(
      <HomePage
        error={undefined}
        planetsData={mockPlanetsData}
        page="1"
        search=""
      />
    );

    expect(screen.getByText('Planets data available')).toBeInTheDocument();
  });
});
