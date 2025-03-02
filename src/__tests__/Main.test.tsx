import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, useLoaderData } from 'react-router';
import fetchMock from 'jest-fetch-mock';
import Main, { loader } from '../routes/main/Main';
import { ResponseType } from '../store/planetsApi.types';
import '@testing-library/jest-dom';

fetchMock.enableMocks();

jest.mock('../common/components/search/Search', () => {
  const MockSearch = () => <div>Search Component</div>;
  MockSearch.displayName = 'Search'; // Set the displayName here
  return MockSearch;
});

jest.mock('../common/components/cardList/CardList', () => {
  const MockCardList = ({ results, count }: ResponseType) => (
    <div>
      CardList Component - {results.length} items, {count} total
    </div>
  );
  MockCardList.displayName = 'CardList'; // Set the displayName here
  return MockCardList;
});

jest.mock('../common/components/selectedItems/SelectedItems', () => {
  const MockSelectedItems = () => <div>SelectedItems Component</div>;
  MockSelectedItems.displayName = 'SelectedItems'; // Set the displayName here
  return MockSelectedItems;
});

jest.mock('../common/components/spinner/Spinner', () => {
  const MockSpinner = () => <div>Spinner Component</div>;
  MockSpinner.displayName = 'Spinner';
  return MockSpinner;
});

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLoaderData: jest.fn(),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLoaderData: jest.fn(),
}));

describe('Main Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  test('renders Spinner when loaderData is not available', () => {
    (useLoaderData as jest.Mock).mockReturnValue(null);

    render(
      <Router>
        <Main
          params={{}}
          loaderData={undefined}
          matches={[
            {
              params: {},
              id: 'root',
              pathname: '/',
              data: undefined,
              handle: {},
            },
          ]}
        />
      </Router>
    );

    expect(screen.getByText('Spinner Component')).toBeInTheDocument();
  });

  test('loader function fetches data correctly', async () => {
    const mockResponse = {
      results: [{ name: 'Tatooine' }, { name: 'Alderaan' }],
      count: 2,
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const request = new Request(
      'https://swapi.dev/api/planets/?search=Tatooine&page=1'
    );
    const response = await loader({ request });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets/?search=Tatooine&page=1'
    );
    expect(response).toEqual(mockResponse);
  });

  test('loader function throws an error when fetch fails', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch planets'));

    const request = new Request(
      'https://swapi.dev/api/planets/?search=Tatooine&page=1'
    );
    await expect(loader({ request })).rejects.toThrow(
      'Failed to fetch planets'
    );
  });
});
