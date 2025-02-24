import { render, screen } from '@testing-library/react';
import { Layout } from '../components';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';
import { store } from '../api/store';
import { ResponseType } from '../api/planetsApi.types.ts';

fetchMock.enableMocks();

describe('Layout Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders Search component', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'mocked data' }));

    render(
      <Provider store={store}>
        <Layout planetsData={{} as ResponseType} />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText('Enter search term')
    ).toBeInTheDocument();
  });
});
