import { Component, HTMLAttributes } from 'react';

export type CardItem = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export class Card extends Component<
  { item: CardItem } & HTMLAttributes<HTMLTableRowElement>
> {
  render() {
    const { item, ...rest } = this.props;
    return (
      <tr {...rest}>
        <td>{item.name}</td>
        <td>{item.terrain}</td>
      </tr>
    );
  }
}
