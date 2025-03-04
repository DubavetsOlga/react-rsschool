import { Wrapper, DetailedCard } from '../../components';
import { PlanetItem } from '../../common/types';
import { fetchData } from '../../common/utils';
import { redirect } from 'next/navigation';

const DetailedPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string; detail?: string };
}) => {
  const { page = '1', search = '', detail } = await searchParams;

  const queryParams = new URLSearchParams();
  queryParams.set('page', page);
  queryParams.set('search', search);
  const redirectUrl = `/?${queryParams.toString()}`;

  if (!detail) {
    redirect(redirectUrl);
  }

  const resPlanet = await fetchData<PlanetItem>(
    `https://swapi.dev/api/planets/${detail}`
  );

  if (!resPlanet) {
    redirect(redirectUrl);
  }

  return (
    <Wrapper page={page} search={search}>
      <DetailedCard planet={resPlanet} />
    </Wrapper>
  );
};

export default DetailedPage;
