import { Component } from 'react';
import { Card, CardItem } from '../card/Card';
import s from './style.module.css';
import Spinner from '../spinner/Spinner';

type ResponseType = {
  count: number;
  next: string;
  previous: string;
  results: CardItem[];
};

type StateType = {
  result: ResponseType;
  loading: boolean;
  error: string | null;
};

const STATE_DEFAULT = {
  result: {
    count: 0,
    next: '',
    previous: '',
    results: [],
  },
  loading: true,
  error: null,
};

export class CardList extends Component<{ searchValue: string }> {
  state: StateType = STATE_DEFAULT;

  fetchData = (): void => {
    this.setState({ loading: true, error: null });

    fetch(
      `https://swapi.dev/api/planets/?search=${this.props.searchValue.trim()}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data: ResponseType) => {
        this.setState({ result: data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: { searchValue: string }) {
    if (this.props.searchValue !== prevProps.searchValue) {
      this.fetchData();
    }
  }

  render() {
    const { result, loading, error } = this.state;

    if (loading) {
      return <Spinner />;
    }
    if (result.results.length === 0) {
      return <p>No results found.</p>;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <table className={s.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Terrain</th>
          </tr>
        </thead>
        <tbody>
          {result.results.map((el) => (
            <Card key={el.url} item={el} />
          ))}
        </tbody>
      </table>
    );
  }
}
