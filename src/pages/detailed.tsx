import { GetServerSideProps } from 'next';
import { Layout } from '../components';
import DetailedCard from '../components/detailedCard/DetailedCard';
import { PlanetItem, ResponseType } from '../api/planetsApi.types';

type DetailedPageProps = {
  planet: PlanetItem | null;
  error: string | null;
  planetsData: ResponseType | null;
};

export const getServerSideProps: GetServerSideProps<DetailedPageProps> = async (
  context
) => {
  const { detail } = context.query;
  const { page = '1', search = '' } = context.query;

  if (!detail) {
    return {
      props: {
        planet: null,
        error: 'Planet ID is missing',
        planetsData: null,
      },
    };
  }

  try {
    const resPlanet = await fetch(`https://swapi.dev/api/planets/${detail}`);
    const planet: PlanetItem = await resPlanet.json();

    const resPlanetsList = await fetch(
      `https://swapi.dev/api/planets/?search=${encodeURIComponent(search as string)}&page=${page}`
    );
    const planetsData: ResponseType = await resPlanetsList.json();

    return {
      props: {
        planet,
        error: null,
        planetsData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        planet: null,
        error: 'Planet not found',
        planetsData: null,
      },
    };
  }
};

export default function DetailedPage({
  planet,
  error,
  planetsData,
}: DetailedPageProps) {
  return (
    <Layout planetsData={planetsData as ResponseType}>
      <DetailedCard planet={planet} error={error} />
    </Layout>
  );
}
