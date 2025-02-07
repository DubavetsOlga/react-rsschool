import { ReactElement } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { getIdFromUrl } from '../../utils/getIdFromURL';

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClickDetail = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('detail', getIdFromUrl(item.url));

    navigate({
      pathname: '/detailed',
      search: newSearchParams.toString(),
    });
  };

  return (
    <tr onClick={handleClickDetail}>
      <td>{item.name}</td>
      <td>{item.terrain}</td>
    </tr>
  );
};
