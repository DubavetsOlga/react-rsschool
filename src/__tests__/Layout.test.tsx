import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Layout } from '../common/components';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';
import { store } from '../store/store';

fetchMock.enableMocks();

describe('Main Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders Search component', () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'mocked data' }));

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Layout />
        </Provider>
      </BrowserRouter>
    );

    expect(
      screen.getByPlaceholderText('Enter search term')
    ).toBeInTheDocument();
  });
});
