import { Wrapper, DetailedCard } from '../../components';
import { PlanetItem } from '../../common/types';
import { fetchData } from '../../common/utils';

const DetailedPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; detail?: string };
}) => {
  const { page = '1', search = '', detail } = await searchParams;

  if (!detail) {
    return (
      <Wrapper page={page} search={search}>
        <DetailedCard planet={null} error="Planet ID is missing" />
      </Wrapper>
    );
  }

  const planetUrl = `https://swapi.dev/api/planets/${detail}`;
  const resPlanet = await fetchData<PlanetItem>(planetUrl);

  return (
    <Wrapper page={page} search={search}>
      <DetailedCard
        planet={resPlanet}
        error={resPlanet ? null : 'Planet not found'}
      />
    </Wrapper>
  );
};

export default DetailedPage;
