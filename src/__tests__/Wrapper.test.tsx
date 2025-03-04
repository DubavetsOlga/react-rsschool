import { render, screen, waitFor } from '@testing-library/react';
import { Wrapper } from '../components';
import '@testing-library/jest-dom';

jest.mock('../components/header/Header', () => ({
  Header: jest.fn(() => <div>Header</div>),
}));

jest.mock('../components/search/Search', () => ({
  Search: jest.fn(() => <div>Search</div>),
}));

jest.mock('../components/cardList/CardListWrapper', () => ({
  CardListWrapper: jest.fn(({ page, search }) => (
    <div>
      CardListWrapper - Page: {page}, Search: {search}
    </div>
  )),
}));

jest.mock('../components/selectedItems/SelectedItems', () => ({
  SelectedItems: jest.fn(() => <div>Selected Items</div>),
}));

jest.mock('../components/spinner/Spinner', () => ({
  Spinner: jest.fn(() => <div>Spinner</div>),
}));

describe('Wrapper', () => {
  it('should render Header, Search, and SelectedItems', () => {
    render(<Wrapper />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Selected Items')).toBeInTheDocument();
  });

  it('should pass correct props to CardListWrapper', async () => {
    const mockPage = '2';
    const mockSearch = 'Tatooine';

    render(<Wrapper page={mockPage} search={mockSearch} />);

    await waitFor(() =>
      screen.getByText(
        `CardListWrapper - Page: ${mockPage}, Search: ${mockSearch}`
      )
    );

    expect(
      screen.getByText(
        `CardListWrapper - Page: ${mockPage}, Search: ${mockSearch}`
      )
    ).toBeInTheDocument();
  });

  it('should render children if provided', () => {
    render(
      <Wrapper>
        <div>Child Component</div>
      </Wrapper>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should render CardListWrapper with default props if page and search are not provided', () => {
    render(<Wrapper />);

    expect(
      screen.getByText('CardListWrapper - Page: 1, Search:')
    ).toBeInTheDocument();
  });
});
