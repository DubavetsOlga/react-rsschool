import { ReactElement } from 'react';
import { useSearchParams } from 'react-router';
import { getIdFromUrl } from '../../utils/getIdFromURL.ts';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickDetail = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('detail', getIdFromUrl(item.url));
    setSearchParams(newSearchParams);
  };

  return (
    <tr onClick={handleClickDetail}>
      <td>{item.name}</td>
      <td>{item.terrain}</td>
    </tr>
  );
};
