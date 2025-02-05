import { ReactElement } from 'react';

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

export const Card = ({ item }: { item: CardItem }): ReactElement => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.terrain}</td>
    </tr>
  );
};
