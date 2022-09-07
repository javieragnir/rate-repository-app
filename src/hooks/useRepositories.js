import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sort) => {
  let variables;

  switch (sort) {
    case 'Latest repositories':
      variables = { orderBy: 'CREATED_AT'}
      break;
    case 'Highest rated repositories':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      break;
    case 'Lowest rated repositories':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      break;
    default:
      throw new Error('Something went wrong with the sorting filter');
  }

  // eslint-disable-next-line no-unused-vars
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  // not sure why, cant use async await on useQuery or else the
  // RepositoryList component breaks (renders before loading data)
  let repositories;
  if (data) {
    repositories = data.repositories;
  }

  const fetchRepositories = async () => {
    await refetch({ GET_REPOSITORIES });
  }

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;