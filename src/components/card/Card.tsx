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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClickDetail = () => {
    const id = getIdFromUrl(item.url);
    if (!id) {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams);

    if (id === searchParams.get('detail')) {
      newSearchParams.delete('detail');
      setSearchParams(newSearchParams);
      return;
    }

    newSearchParams.set('detail', id);
    navigate({
      pathname: '/detailed',
      search: newSearchParams.toString(),
    });
  };

  return (
    <tr
      onClick={handleClickDetail}
      role="button"
      aria-label={`View details of ${item.name}`}
      style={{ cursor: 'pointer' }}
    >
      <td>{item.name}</td>
      <td>{item.terrain}</td>
    </tr>
  );
};
