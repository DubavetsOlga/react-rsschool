import { Wrapper, DetailedCard } from '../../components';
import { PlanetItem, ResponseType } from '../../common/types';
import { fetchData } from '../../common/utils';

const DetailedPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; detail?: string };
}) => {
  const { page = '1', search = '', detail } = await searchParams;

  const resPlanetsList = await fetchData<ResponseType>(
    `https://swapi.dev/api/planets/?search=${encodeURIComponent(search)}&page=${page}`
  );

  if (!detail) {
    return (
      <Wrapper planetsData={resPlanetsList}>
        <DetailedCard planet={null} error="Planet ID is missing" />
      </Wrapper>
    );
  }

  const planetUrl = `https://swapi.dev/api/planets/${detail}`;
  const resPlanet = await fetchData<PlanetItem>(planetUrl);

  return (
    <Wrapper planetsData={resPlanetsList}>
      <DetailedCard
        planet={resPlanet}
        error={resPlanet ? null : 'Planet not found'}
      />
    </Wrapper>
  );
};

export default DetailedPage;
