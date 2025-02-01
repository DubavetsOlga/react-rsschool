import { Component } from 'react';
import { Button } from '../button/Button';

export class ErrorButton extends Component {
  state: { error: boolean } = { error: false };

  handleClick = (): void => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      throw new Error('An error occurred!');
    }

    return <Button onClick={this.handleClick}>Error</Button>;
  }
}
