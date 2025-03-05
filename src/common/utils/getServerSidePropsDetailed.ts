import { GetServerSideProps } from 'next';
import { PlanetItem, ResponseType } from '../types';
import { DetailedPageProps } from '../../pages/detailed';
import { fetchData } from './fetchData';

export const getServerSidePropsDetailed: GetServerSideProps<
  DetailedPageProps
> = async (context) => {
  const { detail, page = '1', search = '' } = context.query;

  const resPlanetsList = await fetchData<ResponseType>(
    `https://swapi.dev/api/planets/?search=${encodeURIComponent(search as string)}&page=${page}`
  );

  if (!detail) {
    return {
      props: {
        planet: null,
        error: 'Planet ID is missing',
        planetsData: resPlanetsList,
      },
    };
  }

  const planetUrl = `https://swapi.dev/api/planets/${detail}`;
  const resPlanet = await fetchData<PlanetItem>(planetUrl);

  return {
    props: {
      planet: resPlanet,
      error: resPlanet ? null : 'Planet not found',
      planetsData: resPlanetsList,
    },
  };
};
