import { ChangeEvent, Component } from 'react';
import { Input } from '../input/Input.tsx';
import { Button } from '../button/Button.tsx';
import s from './style.module.css';

interface Props {
  handleClickSearch: (value: string) => void;
  defaultSearchValue?: string;
}

export class Search extends Component<Props> {
  state = {
    inputValue: this.props.defaultSearchValue || '',
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.target.value });
  };

  handleClickSearch = (): void => {
    this.props.handleClickSearch(this.state.inputValue);
  };

  render() {
    return (
      <div className={s.search}>
        <Input
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Enter search term"
        />
        <Button onClick={this.handleClickSearch}>Search</Button>
      </div>
    );
  }
}
